import { thumbnailsEventListener } from './selectImage.js'
import { animationHandler } from './animations.js'

// TODO: Make this a fancy fadeout/fadein
setInterval(function () {
  placeNewImages()
  animationHandler()
}, 5000);

// TODO: All of this needs to be triggerd by a timed function
async function placeNewImages() {
  const newImage = await newRandomImage();
  const main = document.getElementsByClassName("displayFlex")[0];
  // TODO: This needs to be with a create element funciton instead of this
  main.innerHTML = "";
  newImage.forEach(elem => {
    main.innerHTML += `<div class="mainpageImage previewImage transition">
  <img src="../images/thumbnails/thumbnails_large/${elem[0]}/${
      elem[0]
    }_0.png" data-image="${elem[0]}" data-shot="0" alt="">
  </div>`;
  });

  thumbnailsEventListener()
}

async function newRandomImage() {
  try {
    let dataArray = await getDataArray();
    let changeAbleVar = 9;
    let homePageImages = [];
    // TODO: This 9 is the amount of pics you get we might be able to change it if we need more images to be loaded

    for (let i = 0; i < changeAbleVar; i++) {
      homePageImages.push(
        dataArray[Math.floor(Math.random() * dataArray.length)]
      );
    }

    return homePageImages;
  } catch (err) {
    console.error(err)
  }
}

function getDataArray() {
  return new Promise(async function(resolve, reject) {
    try {
      const res = await fetch("/data");
      const data = await res.json();

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
