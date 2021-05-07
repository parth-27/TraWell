const mongoose = require("mongoose");

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://jds311:TraWell@123@cluster0.xvgj9.mongodb.net/TraWell?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.log.bind(console, "Error connecting db"));
db.once("open", function () {
  console.log(`Connected to db`);
});

module.exports = db;