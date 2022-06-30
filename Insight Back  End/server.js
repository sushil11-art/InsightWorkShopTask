const express = require("express");

const mongoose = require("mongoose");

const path = require("path");

const cors = require("cors");

const bodyParser = require("body-parser");


const dotenv = require("dotenv");
dotenv.config();

const app = express();


app.use(cors());


// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// //import routes here
const users = require("./routes/users");

app.use("/api/users", users);

mongoose
  .connect(process.env.DB_CONNECT)
  .then((result) => {
    console.log("Connected to db");
    console.log("App will be run on port 4000");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });

