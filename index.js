const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const data = require('./partials/data')
const openbeelden = require('./partials/openbeelden')
const cronJobs = require('./partials/cronJobs')
const cron = require('node-cron')

app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static('static/'))
  // .use(bodyParser.urlencoded({ extended: true }))

  .get('/', index)
  .get('/random/:id', sendRandom)
  .get('/search/:id', search)
  .get('/detail/:id', detail)

  .listen(port, () => console.log(`[server] listening on port ${port}`))

async function index (req, res) {
  let clips = data.random()

  res.render('index.ejs', {
    clips: clips
  })
}

function search (req, res) {
  const imgs = req.url.split('/')[2].split('-')
  const recentImg = imgs[imgs.length - 1]

  data.randomRelated(recentImg)
    .then(relatedImages => {
      res.render('search', {
        prevImg: recentImg,
        newImgs: relatedImages,
        path: imgs
      })
    })
    .catch(err => {
      res.render('error', {
        msg: err
      })
    })
}

async function detail (req, res) {
  const id = req.params.id

  const apiData = await openbeelden.get(id)
  const data = apiData['OAI-PMH'].GetRecord.record.metadata

  res.render('detail', {
    data: data
  })
}

function sendRandom (req, res) {
  const amount = req.params.id

  res.json(data.random(amount))
}

// Every sunday this Cron will run and it will update the array of random images
cron.schedule('0 0 * * 7', function () {
  cronJobs.writeArrayToFile()
})
