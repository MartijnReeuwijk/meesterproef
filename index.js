const express = require("express"),
  fetch = require("node-fetch"),
  bodyParser = require("body-parser"),
  app = express(),
  http = require("http").Server(app),
  port = process.env.PORT || 5000,
  xmlParser = require("xml2json"),
  fs = require("fs"),
  dataArray = require('./static/array.js'),
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

  .listen(port, () => console.log(`[server] listening on port ${port}`));

async function index(req, res) {
  let clips = randomImages()

  res.render("index.ejs", {
    clips: clips
  });
}

function sendData(req, res) {
  res.json(dataArray)
}

function randomImages(){
  let homePageImages = []

  for (let i = 0; i < 9; i++) {
    homePageImages.push(dataArray[Math.floor(Math.random() * dataArray.length)])
  }

  return homePageImages
}
