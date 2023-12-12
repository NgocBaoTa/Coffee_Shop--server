/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
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
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

const mongoURI =
  process.env.MONGODB_URI 
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
    key: "coffee_session",
    secret: "random", 
    resave: true, 
    saveUninitialized: false, 
    rolling: true,
    store,
    cookie: {
      expires: 60 * 1000 * 60 * 24,
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
