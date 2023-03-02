const express = require("express");
const axios = require("axios");
const app = express();
const contactRoute = require("./routes/contactRoute.js");
const connectDb = require("./config/dbconnection.js");
const userRoute = require("./routes/userRoute");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");



connectDb();
app.use(express.json());
app.use("/api/contact", contactRoute);
app.use("/api/user",  userRoute);
app.use(errorHandler);

// const api = async (req, res) => {
//   const val = await axios.get("https://dummyjson.com/user");
//     const data = val.data
//   return res.json(data);
// };
// app.get("/api/data", api)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
