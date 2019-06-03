const express = require("express"),
  fetch = require("node-fetch"),
  // request = require("request"),
  bodyParser = require("body-parser"),
  app = express(),
  http = require("http").Server(app),
  port = process.env.PORT || 5000,
  xmlParser = require("xml2json"),
  fs = require("fs");
  // Filehound = require("filehound"),
  // rp = require("request-promise");

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
  let firstLoadNumberArray = ["1005255","1005236","1005201","1004470","1004205","1004044","1004013","1003891","1003714","1003690","1003648","1003627","1003511","1000452","1000836","1000986","1001158","1001176","1001466","1001487","1001533","1001563","1001741","1001766","1001921","1002043","1002054","10021","1002986","1003237"]
  let homePageImagesArray = []
  for (let i = 0; i < 9; i++) {
    // let rand = firstLoadNumberArray[Math.floor(Math.random() * firstLoadNumberArray.length)];
    homePageImagesArray.push(firstLoadNumberArray[Math.floor(Math.random() * firstLoadNumberArray.length)])
  }
return homePageImagesArray
}

function firstRandom(req, res) {
  let clips = firstLoadNumberFunction()
  console.log(clips);
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
