console.log("clock");

// TODO: Make this a fancy fadeout/fadein
setInterval(function () {
  placeNewImages();
}, 5000);

// TODO: All of this needs to be triggerd by a timed function
async function placeNewImages() {
  const newImage = await newRandomImage();
  console.log("deze", newImage);
  const html = document.getElementsByClassName("displayFlex")[0];
  // TODO: This needs to be with a create element funciton instead of this
  html.innerHTML = "";
  newImage.forEach(elem => {
    html.innerHTML += `<div class="mainpageImage previewImage transition">
  <img src="../images/thumbnails/thumbnails_large/${elem[0]}/${
      elem[0]
    }_0.png" alt="">
  </div>`;
  });
}

async function newRandomImage() {
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
}

function getDataArray() {
  return new Promise(async function(resolve, reject) {
    try {
      const res = await fetch("/data");
      const data = await res.json();
      // console.log(data);

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
newRandomImage();
placeNewImages();
