const express = require("express"),
  fetch = require("node-fetch"),
  bodyParser = require("body-parser"),
  app = express(),
  // Waarom de http module?
  http = require("http").Server(app),
  port = process.env.PORT || 5000,
  xmlParser = require("xml2json"),
  fs = require("fs"),
  cron = require("node-cron"),
  FileHound = require('filehound'),
  dataArray = require('./static/array.js'),
  cronJobs = require('./partials/cronJobs'),
  searchResults = require('./static/semia_data/SEMIA_search_results10k.json'),
  openbeelden = require('./partials/openbeelden');

app
  .set("view engine", "ejs")
  .set("views", "views")
  .use(express.static("static/"))
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  .get("/", index)
  .get("/data", sendData)
  .get("/search/:id", detail)

  .listen(port, () => console.log(`[server] listening on port ${port}`));

async function index(req, res) {
  let clips = randomImages()

  res.render("index.ejs", {
    clips: clips
  });
}

function detail(req, res) {
  let newImgs = []
  const urlParts = req.url.split("/");
  const img = urlParts[urlParts.length - 1];

  const imgIndex = searchResults.findIndex(el => el["shot_id"] === `${img}_0`);

  const clickedImg = searchResults[imgIndex];

  if (!clickedImg) {
    res.render('error', {
      msg: 'No search results found'
    })

    return
  }
  
  for (let key in clickedImg.results) {
    const category = clickedImg.results[key];

    for (let i = 0; i < 3; i++) {
      const randomImage = category[Math.floor(Math.random() * category.length)];
      newImgs.push(randomImage);
    }
  }

  newImgs = newImgs.filter((item, i) => i < 9);

  res.render("detail", {
    prevImg: img,
    newImgs: newImgs
  });
}

function sendData(req, res) {
  res.json(dataArray);
}

function randomImages(){
  let homePageImages = []

  for (let i = 0; i < 9; i++) {
    homePageImages.push(dataArray[Math.floor(Math.random() * dataArray.length)])
  }

  return homePageImages
}

// Every sunday this Cron will run and it will update the array of random images
cron.schedule("0 0 * * 7", function() {
  cronJobsDataToArray();
});
