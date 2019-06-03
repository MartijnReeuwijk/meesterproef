const express = require("express"),
  fetch = require("node-fetch"),
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
