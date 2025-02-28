const FileHound = require('filehound')
const fs = require('fs')

function getRandomNames () {
  return new Promise(function (resolve, reject) {
    let imagePath = []
    FileHound.create()
      .path('./static/images/thumbnails/thumbnails_large/')
      .directory()
      .find()
      .then(subdirectories => {
        for (let i = 0; i < subdirectories.length; i++) {
          imagePath.push(subdirectories[i].match(/\d+/g).map(Number))
        }
        resolve(imagePath)
      })
      .catch(err => reject(err))
  })
}

async function writeArrayToFile () {
  console.log('writeArrayToFile')
  try {
    let a = await getRandomNames()
    let b = a.flat()
    let c = JSON.stringify(b)

    fs.writeFile('static/array.json', c, err => {
      if (err) throw err
      console.log('Array is updated')
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getRandomNames,
  writeArrayToFile
}
