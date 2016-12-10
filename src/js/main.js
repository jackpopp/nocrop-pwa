// get aspect ratio
// apply aspect ratio to height and width of container using the size of the container
// for (eg 400px) as max size of the larger size of the image (width or height)
// calc the other size based off of that

const init = () => {
  const SIZE = 800;
  const PAD = 0;
  const HEIGHT = Symbol('height');
  const WIDTH = Symbol('width');

  const canvasEl = document.querySelector('.canvas');
  const context = canvasEl.getContext('2d');

  canvasEl.width = SIZE;
  canvasEl.height = SIZE;

  const image = new Image();
  image.onload = () => {
    const baseHeight = image.height;
    const baseWidth = image.width;
    let measurement = baseWidth > baseHeight ? WIDTH : HEIGHT;
    // ratio is higher measurement divided by lower
    const ratio = baseWidth > baseHeight ? baseWidth/baseHeight : baseHeight/baseWidth;

    let newWidth = SIZE;
    let newHeight = SIZE;
    let padX = PAD;
    let padY = PAD;

    if (measurement == WIDTH) {
       newHeight = Math.floor(SIZE/ratio);
       padY = Math.floor((SIZE - newHeight)/2);
    }

    if (measurement == HEIGHT) {
       newWidth = Math.floor(SIZE/ratio);
       padX = Math.floor((SIZE - newWidth)/2);
    }
    context.clearRect(0, 0, SIZE, SIZE);
    context.drawImage(image, padX, padY, newWidth, newHeight);
  }

  const fileEl = document.querySelector('.file-input');

  fileEl.addEventListener('change', (e) => {
    const file = fileEl.files[0];
    const fileReader = new FileReader(file);

    fileReader.onload = () => {
      const dataURL = fileReader.result;
      image.src = dataURL;
    };

    fileReader.readAsDataURL(file);
  });

  const saveEl = document.querySelector('.save');
  saveEl.addEventListener('click', () => {
    canvasEl.toDataURL();
    window.open(canvasEl.toDataURL(), '_blank');
  });
}

document.addEventListener("DOMContentLoaded", init);
