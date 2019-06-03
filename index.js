const express = require("express"),
  request = require("request"),
  bodyParser = require("body-parser"),
  app = express(),
  http = require("http").Server(app),
  port = process.env.PORT || 5000,
  xmlParser = require("xml2json"),
  fs = require("fs"),
  Filehound = require("filehound"),
  rp = require("request-promise");

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

// Chagne this code
function getRandomNames() {
  return new Promise(function(resolve, reject) {
    let imagePath = [];
    Filehound.create()
      .path("./static/images/thumbnails/thumbnails_large/")
      .directory() // only search for directories
      .find()
      .then(subdirectories => {
        for (let i = 0; i < 9; i++) {
          imagePath.push(subdirectories[i].match(/\d+/g).map(Number));
          // .replace(/\s/g, '')
        }
        resolve(imagePath);
      });
  });
}

async function firstRandom(req, res) {

  let randomNames = await getRandomNames();
  console.log(randomNames.lenght);
  res.render("index.ejs", {
    clips: randomNames
  });
}

// async function firstRandom(req, res) {
//     // let clips = await clipData();
//     res.render("index.ejs", {
//       // clips: clips["results"]
//       // await the api call
// });
//
//   }

// oke need to get the Data from the array of maps in map data.

function getData(id) {
  return new Promise((resolve, reject) => {
    const vidID = id;
    const url =
      "https://openbeelden.nl/feeds/oai/?verb=GetRecord&identifier=oai:openimages.eu:" +
      vidID +
      "&metadataPrefix=oai_dc";
    request(url, function(error, response, body) {
      let dataJson = JSON.parse(xmlParser.toJson(body));
      console.log(dataJson);
      resolve(dataJson);
      reject(this.statusText);
    });
  });
}

getData();
// getRandomNames();
