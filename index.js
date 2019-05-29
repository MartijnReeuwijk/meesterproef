const express = require("express"),
  request = require("request"),
  bodyParser = require("body-parser"),
  app = express(),
  http = require("http").Server(app),
  port = process.env.PORT || 5000,
  xmlParser = require("xml2json"),
  fs = require("fs"),
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

function firstRandom(req, res) {
  res.render("index.ejs", {
    // nog geen data nodig voor basic
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
