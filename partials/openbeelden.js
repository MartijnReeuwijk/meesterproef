function get(id){
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

module.exports = {
  get
}