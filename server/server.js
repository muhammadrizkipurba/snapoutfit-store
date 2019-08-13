const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const path = require("path");

// Import Routes
const userRoute = require("./api/routes/user")
const productRoute = require("./api/routes/product");
const brandRoute = require("./api/routes/brand");
const colorRoute = require("./api/routes/color");
const siteRoute = require("./api/routes/site");


const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to database
const db = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(express.static('client/build'));

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// Use Routes

app.get('/', (req,res) => {
  res.send(`<h1>Snapoutfit Store API running from Heroku on port ${port} </h1>`)
})
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/product/brand", brandRoute);
app.use("/product/color", colorRoute);
app.use("/site", siteRoute);

// Default Routes
if(process.env.NODE_ENV === 'production' ) {
  app.get('/*', (req,res) => {
    res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })

}

const port = process.env.PORT || 1996;

app.listen(port, () => console.log(`Server running on port ${port}`));
