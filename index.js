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

const firstLoadNumberArray = ["1000452","1000836","1000986","1001158","1001176","1001466","1001487","1001533","1001563","1001741","1001766","1001921","1002043","1002054","10021","1002986","1003237"]

function firstRandom(req, res) {
  res.render("index.ejs", {
    // clips: numberArray
  });
}

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
