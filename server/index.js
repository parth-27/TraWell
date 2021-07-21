const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const db = require("./config/mongoose");
const path = require("path");
app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

// only for deployment
// if (process.env.NODE_ENV === "production") {
//   // app.use(express.static("build"));
//   app.use(express.static(path.join(__dirname, "client", "build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
  } else {
    console.log(`Server is up and running on port ${port}`);
  }
});