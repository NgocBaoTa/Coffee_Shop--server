/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

const mongoURI =
  // "mongodb+srv://baongocta:baongocta@cluster0.poueqht.mongodb.net/directConnection=true";
  "mongodb://127.0.0.1:27017/Coffee_Shop";
(async function () {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
})();

const store = new mongoDBSession({
  uri: mongoURI,
  collection: "Sessions",
});

app.use(
  session({
    key: "random",
    secret: "random", // key that will sign the cookie that saved in the browser
    resave: true, // don't create a new session for every requests in the same browser and with same user
    saveUninitialized: false, //if we have not touched or modified the session, we don't want it to be saved
    rolling: true,
    store,
    cookie: {
      expires: 60 * 1000 * 24,
    },
  })
);

app.get("/", function (req, res) {
  res.send("hello world");
});

app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
