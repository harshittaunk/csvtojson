const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
csvtojson()
    .fromFile("plot.csv")
    .then(csvData =>
    {
    console.log(csvData);
    mongodb.connect("mongodb://localhost:27017/",
      { 
      useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;
           client.db("mydb")
          .collection("category")
          .insertMany(csvData, (err, res) => {
           if (err) throw err;
           console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });