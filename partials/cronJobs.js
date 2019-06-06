function cronJobsDataToArray() {
  function getRandomNames() {
    return new Promise(function(resolve, reject) {
      let imagePath = [];
      Filehound.create()
        .path("./static/images/thumbnails/thumbnails_large/")
        .directory()
        .find()
        .then(subdirectories => {
          for (let i = 0; i < subdirectories.length; i++) {
            imagePath.push(subdirectories[i].match(/\d+/g).map(Number));
          }
          resolve(imagePath);
        });
    });
  }

async function writeArrayToFile() {
    let a = await getRandomNames();
    let b = JSON.stringify(a);
    fs.writeFile('/static/array.js', b, (err) => {
      if (err) throw err;
      console.log('Array is updated');
    });
  }
}
module.exports = {
  cronJobsDataToArray
}
