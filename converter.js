// Define constants for HTML elements
const downloadButton = document.getElementById('download-button');
const originalImage = document.getElementById('original-image');
const convertedImage = document.getElementById('converted-image');
const formatSelect = document.getElementById('format-select');
const displayCheckbox = document.getElementById('display-checkbox');

// Prevent default behavior when file is dropped on the page
function handleDrop(e) {
e.preventDefault();
e.stopPropagation();
const files = e.dataTransfer.files;
if (files.length > 0) {
originalImage.files = files;
}
}

function convertImage() {
if (!originalImage.files || !originalImage.files[0]) {
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
  const mimeType = `image/${formatSelect.value}`;
  const dataURL = canvas.toDataURL(mimeType);
  convertedImage.src = dataURL;
  convertedImage.alt = `Converted image in ${formatSelect.value.toUpperCase()} format`;

  downloadButton.href = dataURL;
  downloadButton.download = `image.${formatSelect.value}`;

  if (displayCheckbox.checked) {
    convertedImage.style.display = 'inline';
  } else {
    convertedImage.style.display = 'none';
  }

  downloadButton.style.display = 'block';
};
image.src = imageDataUrl;
};
reader.readAsDataURL(originalImage.files[0]);
}

// Clear selected file when page is refreshed
window.addEventListener('beforeunload', function() {
originalImage.value = '';
});

// Attach event listeners to HTML elements
originalImage.addEventListener('change', convertImage);
formatSelect.addEventListener('change', convertImage);
displayCheckbox.addEventListener('change', convertImage);
document.addEventListener('drop', handleDrop);
document.addEventListener('dragover', function(e) {
e.preventDefault();
e.stopPropagation();
});
