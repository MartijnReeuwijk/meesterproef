const express = require("express"),
  fetch = require("node-fetch"),
  bodyParser = require("body-parser"),
  app = express(),
  http = require("http").Server(app),
  port = process.env.PORT || 5000,
  xmlParser = require("xml2json"),
  fs = require("fs"),
  DataArray = require('./static/array.js');

app
  .set("view engine", "ejs")
  .set("views", "views")
  .use(express.static("static/"))
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  .get("/", firstRandom);

http.listen(port, () => {
  console.log(port);
});


function firstLoadNumberFunction(){
  let homePageImagesArray = []

  for (let i = 0; i < 9; i++) {
    homePageImagesArray.push(DataArray[Math.floor(Math.random() * DataArray.length)])
  }
return homePageImagesArray
}

async function firstRandom(req, res) {
  let clips = firstLoadNumberFunction()

  res.render("index.ejs", {
    clips: clips
  });
}

function getData(id){
  return new Promise(async (resolve, reject) => {
    const vidID = id || 1001004 ;
    const url = "https://openbeelden.nl/feeds/oai/?verb=GetRecord&identifier=oai:openimages.eu:" + vidID + "&metadataPrefix=oai_dc";

    try {
      const res = await fetch(url);
      const xml = await res.text();

      const data = xmlParser.toJson(xml);

      resolve(data);
    } catch(err) {
      reject(err);
    }
  })
}

getData()
  .then(res => console.log(res))
  .catch(err => console.error(err));
