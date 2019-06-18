const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const data = require('./partials/data')
const openbeelden = require('./partials/openbeelden')
const cronJobs = require('./partials/cronJobs')
const cron = require('node-cron')
const db = require('./partials/db')

db.init()

app
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static('static/'))
  .use(bodyParser.urlencoded({ extended: true }))

  .get('/', index)
  .get('/offline', offline)
  .get('/random/:id', sendRandom)
  .get('/search/:id', search)
  .get('/detail/:id', detail)
  .post('/share', share)
  .get('/share/:id', shareUrl)
  .get('/ob-video/:id', sendMetadata)
  .get('/filter/:id', sendFiltered)
  .get('/related/:id/:amount', sendRelated)

  .use(notFound)

  .listen(port, () => console.log(`[server] listening on port ${port}`))

async function index (req, res) {
  let clips = data.random()

  res.render('index', {
    clips: clips
  })
}

function offline (req, res) {
  res.render('offline')
}

function search (req, res) {
  const imgs = req.url.split('/')[2].split('-')
  const recentImg = imgs[imgs.length - 1]
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  data.randomRelated(recentImg)
    .then(relatedImages => {
      res.render('search', {
        prevImg: recentImg,
        newImgs: relatedImages,
        path: imgs,
        url: fullUrl
      })
    })
    .catch(err => {
      console.error(err)

      res.status(500).render('error', {
        msg: 'Something went wrong..'
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

async function share (req, res) {
  const url = {
    current: req.body.currentUrl,
    custom: req.body.customUrl
  }

  try {
    const result = await db.query('SELECT * FROM semia.urls WHERE shortUrl = ?', url.custom)

    if (result.length !== 0) {
      res.render('error', {
        msg: 'The submitted custom url already exists'
      })

      return
    }

    await db.query('INSERT INTO semia.urls SET origionalUrl = ?, shortUrl = ?', [
      url.current,
      url.custom
    ])

    res.redirect(`/share/${url.custom}`)
  } catch (err) {
    console.error(err)

    res.status(500).render('error', {
      msg: 'Something went wrong..'
    })
  }
}

async function shareUrl (req, res) {
  const id = req.params.id

  try {
    const result = await db.query('SELECT origionalUrl FROM semia.urls WHERE shortUrl = ?', id)

    res.redirect(`/detail/${result[0].origionalUrl}`)
  } catch (err) {
    console.error(err)

    res.status(500).render('error', {
      msg: 'Something went wrong..'
    })
  }
}

function sendRandom (req, res) {
  const amount = req.params.id

  res.json(data.random(amount))
}

function sendFiltered (req, res) {
  const imageId = req.params.id
  res.json(data.related(imageId))
}

function sendRelated (req, res) {
  const id = req.params.id
  const amount = req.params.amount

  data.randomRelated(id, amount)
    .then(images => res.json(images))
    .catch(err => {
      console.error(err)

      res.status(500).json({
        error: 'Something went wrong'
      })
    })
}

async function sendMetadata (req, res) {
  const id = req.params.id

  try {
    const data = await openbeelden.get(id)

    res.json(data['OAI-PMH'])
  } catch (err) {
    console.error(err)

    res.status(500).render('error', {
      msg: 'Something went wrong..'
    })
  }
}

function notFound (req, res) {
  res.status(404).render('error', {
    msg: '404 page not found'
  })
}

// Every sunday this Cron will run and it will update the array of random images
cron.schedule('0 0 * * 7', function () {
  cronJobs.writeArrayToFile()
})
