console.log("clock");



async function newRandomImage() {
  let dataArray = await getDataArray();
    let homePageImages = []
    for (let i = 0; i < 9; i++) {
      homePageImages.push(dataArray[Math.floor(Math.random() * dataArray.length)])
    }
    console.log(homePageImages);
    return homePageImages
}

function getDataArray() {
  return new Promise(async function(resolve, reject) {
    try {
      const res = await fetch("/data");
      const data = await res.json();
      // console.log(data);

      resolve(data);
    } catch(err) {
      reject(err);
    }
  });;
}
newRandomImage();
