const express = require("express"),
  request = require("request"),
  bodyParser = require("body-parser"),
  app = express(),
  http = require("http").Server(app),
  port = process.env.PORT || 5000,
  fs = require("fs"),
  rp = require("request-promise");

  app
  .set("view engine", "ejs")
  .set("views", "views")

  .use(express.static("static/"))
  .use(bodyParser.urlencoded({
    extended: true
  }))

  // .get("/", function );

  http.listen(port, () => {
    console.log(port);
  });

function getData(id){
  return new Promise((resolve, reject) => {
    const vidID = id || 1001004 ;
    const url = "https://openbeelden.nl/feeds/oai/?verb=GetRecord&identifier=oai:openimages.eu:" + vidID + "&metadataPrefix=oai_dc";
    console.log(vidID);
    console.log(url);
    request(url, function(error, response, body){
      console.log(body);
      let videoMetaData = JSON.parse(body);
      console.log("error:", error);
      console.log("statusCode:", response && response.statusCode);
      resolve(videoMetaData);
      reject(this.statusText);
    })
  })
}

getData();
