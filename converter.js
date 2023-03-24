const downloadButton = document.getElementById('download-button');

// Prevent default behavior when file is dropped on the page
function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const fileInput = document.getElementById('original-image');
    fileInput.files = files;
  }
}

function convertImage() {
  const inputImage = document.getElementById('original-image');
  const outputImage = document.getElementById('converted-image');
  const formatSelect = document.getElementById('format-select');
  const selectedFormat = formatSelect.value;
  const displayCheckbox = document.getElementById('display-checkbox');

  if (!inputImage.files || !inputImage.files[0]) {
    console.error('No file selected.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function() {
    const imageDataUrl = reader.result;
    const image = new Image();
    image.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);

      const mimeType = `image/${selectedFormat}`;
      const dataURL = canvas.toDataURL(mimeType);
      outputImage.src = dataURL;
      outputImage.alt = `Converted image in ${selectedFormat.toUpperCase()} format`;

      downloadButton.href = dataURL;
      downloadButton.download = `image.${selectedFormat}`;

      if (displayCheckbox.checked) {
        outputImage.style.display = 'inline';
      } else {
        outputImage.style.display = 'none';
      }

      downloadButton.style.display = 'block';
    };
    image.src = imageDataUrl;
  };
  reader.readAsDataURL(inputImage.files[0]);
}

// Clear selected file when page is refreshed
window.addEventListener('beforeunload', function() {
  const inputImage = document.getElementById('original-image');
  inputImage.value = '';
  });
