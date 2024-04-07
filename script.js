const posterForm = document.getElementById('poster-form');
const frontImageInput = document.getElementById('front-image');
const backImageInput = document.getElementById('back-image');
const priceInput = document.getElementById('price');
const coinTitleInput = document.getElementById('coin-title');
const coinWeightInput = document.getElementById('coin-weight');
const coinConditionInput = document.getElementById('coin-condition');
const coinNumberInput = document.getElementById('coin-number');
const generatePosterButton = document.getElementById('generate-poster');
const posterContainer = document.getElementById('poster-container');
const posterCanvas = document.getElementById('poster-canvas');
const downloadPosterButton = document.getElementById('download-poster');

generatePosterButton.addEventListener('click', generatePoster);
downloadPosterButton.addEventListener('click', downloadPoster);

function generatePoster() {
  const frontImage = frontImageInput.files[0];
  const backImage = backImageInput.files[0];
  const price = priceInput.value;
  const coinTitle = coinTitleInput.value;
  const coinWeight = coinWeightInput.value;
  const coinCondition = coinConditionInput.value;
  const coinNumber = coinNumberInput.value;

  // Generate the poster image using the input data
  const posterData = {
    frontImage,
    backImage,
    price,
    coinTitle,
    coinWeight,
    coinCondition,
    coinNumber
  };

  // Create the poster image and update the poster-canvas element
  updatePosterImage(posterData);
  posterContainer.classList.remove('d-none');
}

function updatePosterImage(posterData) {
  const canvas = posterCanvas;
  const ctx = canvas.getContext('2d');

  // Load the background image
  const backgroundImage = new Image();
  backgroundImage.src = 'poster-bg.jpg';

  // Load the front and back images
  const frontImageElement = new Image();
  frontImageElement.src = URL.createObjectURL(posterData.frontImage);
  const backImageElement = new Image();
  backImageElement.src = URL.createObjectURL(posterData.backImage);

  // Wait for all images to load before drawing on the canvas
  Promise.all([
    new Promise((resolve) => (frontImageElement.onload = resolve)),
    new Promise((resolve) => (backImageElement.onload = resolve)),
    new Promise((resolve) => (backgroundImage.onload = resolve))
  ]).then(() => {
    // Draw the background image on the canvas
    canvas.width = backgroundImage.width;
    canvas.height = backgroundImage.height;
    ctx.drawImage(backgroundImage, 0, 0);

    // Draw the front and back images on the canvas
    ctx.drawImage(frontImageElement, 110, 50, 300, 300);
    ctx.drawImage(backImageElement, 480, 50, 300, 300);

    // Add the user information on top of the images
    ctx.fillStyle = '#FFFAF3';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`₹ ${posterData.price}`, 750, 55);
    ctx.fillText(`${posterData.coinTitle}`, 40, 386);
    ctx.fillText(`Weight: ${posterData.coinWeight}`, 40, 422);
    ctx.fillText(`Condition: ${posterData.coinCondition}`, 40, 454);
    ctx.fillText(`Coin No.: ${posterData.coinNumber}`, 40, 490);
  });
}

function downloadPoster() {
  // Create a link element and click it to download the poster image
  const link = document.createElement('a');
  link.download = 'poster.jpg';
  link.href = posterCanvas.toDataURL('image/jpeg', 0.9);
  link.click();
}
