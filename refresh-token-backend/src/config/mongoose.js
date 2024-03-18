const mongoose = require("mongoose");

let mongoURI = process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_TEST: process.env.MONGO_URI
mongoURI = mongoURI.substring(1, mongoURI.length - 1);

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(instance =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch(error => console.log("Connection failed!", error));
