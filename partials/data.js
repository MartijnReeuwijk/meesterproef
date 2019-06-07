const images = require('../static/array.json')
const searchResults = require('../static/semia_data/SEMIA_search_results10k.json')

function random (amount = 9) {
  let imgArray = []

  for (let i = 0; i < amount; i++) {
    imgArray.push(images[Math.floor(Math.random() * images.length)])
  }

  return imgArray
}

function randomRelated (img) {
  return new Promise((resolve, reject) => {
    let newImgs = []
    const imgIndex = searchResults.findIndex(el => el['shot_id'] === `${img}_0`)
    const clickedImg = searchResults[imgIndex]

    if (!clickedImg) reject(new Error('No search results found'))

    for (let key in clickedImg.results) {
      const category = clickedImg.results[key]

      for (let i = 0; i < 3; i++) {
        const randomImage = category[Math.floor(Math.random() * category.length)]
        newImgs.push(randomImage)
      }
    }

    // TODO: Shuffle before filtering
    newImgs = newImgs.filter((item, i) => i < 9)

    resolve(newImgs)
  })
}

module.exports = {
  all: images,
  random,
  randomRelated
}
