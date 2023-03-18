const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes").auth;
const passport = require("passport");
require("./config/passport")(passport);
const courseRoute = require("./routes").course;
const cors = require("cors");

mongoose
  .connect(process.env.MONGOOESCONNCT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to mongoose");
  })
  .catch((e) => {
    console.log("failed to connect mongoose");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8080, (req, res) => {
  console.log("server is running at 8080 port");
});
