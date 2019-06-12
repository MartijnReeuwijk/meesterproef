const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const data = require('./partials/data')
// const openbeelden = require('./partials/openbeelden')
const cronJobs = require('./partials/cronJobs')
const cron = require('node-cron')

app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static('static/'))
  // .use(bodyParser.urlencoded({ extended: true }))

  .get('/', index)
  .get('/offline', offline)
  .get('/random/:id', sendRandom)
  .get('/search/:id', detail)

  .listen(port, () => console.log(`[server] listening on port ${port}`))

async function index (req, res) {
  let clips = data.random()

  res.render('index.ejs', {
    clips: clips
  })
}

function offline() {
  res.render('offline.ejs')
}

function detail (req, res) {
  const urlParts = req.url.split('/')
  const img = urlParts[urlParts.length - 1]

  data.randomRelated(img)
    .then(imgs => {
      res.render('detail', {
        prevImg: img,
        newImgs: imgs
      })
    })
    .catch(err => {
      res.render('error', {
        msg: err
      })
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
