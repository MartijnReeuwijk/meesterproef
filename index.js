const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
// const fs = require('fs')
const dataArray = require('./static/array.json')
const searchResults = require('./static/semia_data/SEMIA_search_results10k.json')
// const openbeelden = require('./partials/openbeelden')
const cronJobs = require('./partials/cronJobs')
const cron = require('node-cron')

app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static('static/'))
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  .get('/', index)
  .get('/data', sendData)
  .get('/search/:id', detail)

  .listen(port, () => console.log(`[server] listening on port ${port}`))

async function index (req, res) {
  let clips = randomImages()

  res.render('index.ejs', {
    clips: clips
  })
}

function detail (req, res) {
  let newImgs = []
  const urlParts = req.url.split('/')
  const img = urlParts[urlParts.length - 1]

  const imgIndex = searchResults.findIndex(el => el['shot_id'] === `${img}_0`)

  const clickedImg = searchResults[imgIndex]

  if (!clickedImg) {
    res.render('error', {
      msg: 'No search results found'
    })

    return
  }

  for (let key in clickedImg.results) {
    const category = clickedImg.results[key]

    for (let i = 0; i < 3; i++) {
      const randomImage = category[Math.floor(Math.random() * category.length)]
      newImgs.push(randomImage)
    }
  }

  newImgs = newImgs.filter((item, i) => i < 9)

  res.render('detail', {
    prevImg: img,
    newImgs: newImgs
  })
}

function sendData (req, res) {
  res.json(dataArray)
}

function randomImages () {
  let homePageImages = []

  for (let i = 0; i < 9; i++) {
    homePageImages.push(dataArray[Math.floor(Math.random() * dataArray.length)])
  }

  return homePageImages
}

// Every sunday this Cron will run and it will update the array of random images
cron.schedule('* * * * *', function () {
  cronJobs.writeArrayToFile()
})
