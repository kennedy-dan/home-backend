const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cors = require("cors");

const categoryRoute = require("./src/routes/category");
const productRoute = require("./src/routes/product");
const cartRoute = require("./src/routes/cart");
const billingRoute = require("./src/routes/billing");
const userRoute = require('./src/routes/user')
const blog =  require('./src/routes/blog')
env.config();

const port = process.env.PORT || 2000;
"mongodb://localhost:27017/jumia"
// `mongodb+srv://mom:mommy@cluster0.8gbdb.mongodb.net/home?retryWrites=true&w=majority
mongoose
  .connect(`mongodb://localhost:27017/home`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connected");
  });

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());


app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", categoryRoute)
app.use("/api", billingRoute)
app.use('/api', userRoute)
app.use('/api', blog)

env.config();

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
