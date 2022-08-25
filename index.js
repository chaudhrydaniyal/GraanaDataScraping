const express = require("express");
const app = express();
const port = 3001;

const bodyParser = require("body-parser");

const scrapers = require("./scrapers");

var MongoClient = require("mongodb").MongoClient;
//Create a database named "mydb":
var url = "mongodb://localhost:27017/GraanaData";

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


process.setMaxListeners(Infinity); // <== Important line


app.get("/graanaData", async (req, res) => {
  const propertyType = "Flat";
  // const propertyType = "Houses_Property";
  const city = "Lahore";

  var number = "0";

  switch (city) {
    case "Lahore":
      number = "1";
      break;
    case "Karachi":
      number = "2";
      break;
    case "Islamabad":
      number = "3";
      break;
  }

  for (i = 1; i < 36; i++) {
    const receivedData = await scrapers.scrapeZameenData(
      `https://www.graana.com/house/for_rent/islamabad/all/1?offset=${((i-1)*30)}&page=${i}`,
      propertyType,
      city
    );

      console.log("receivedData",receivedData)

      // console.log("recd",receivedData.finalZameenData)

      // res.send(receivedData);

    MongoClient.connect(url, function (err, db) {

      if (err) throw err;
      console.log("Database created!");

      // await db.createCollection("mycol", { capped : true, autoIndexID : true, size : 6142800, max : 10000 } )
      
      if (err) throw err;
      var dbo = db.db("GraanaData");
      dbo
        .collection("HouseIslamabad")
        .insertMany(receivedData.finalZameenData, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
