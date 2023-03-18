const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A require is coming in to auth.js");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is succeed",
  };
  return res.json(msgObj);
});

router.post("/register", async (req, res) => {
  console.log("Register now!!!");
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const mailExist = await User.findOne({ email: req.body.email });
  if (mailExist) {
    return res.status(400).send("Mail already exist");
  }

  const hash = await bcrypt.hash(req.body.password, 10);

  let newuser = new User({
    email: req.body.email,
    username: req.body.username,
    password: hash,
    role: req.body.role,
  });
  try {
    const savedUser = await newuser.save();
    res.status(200).send({
      message: "Success",
      savedObj: savedUser,
    });
  } catch (e) {
    res.status(400).send("Register failed");
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          res.status(401).send(err);
        }
        if (result) {
          const tokenObj = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObj, process.env.TOKENSECRET);
          res.send({ message: "success", token: "jwt " + token, user });
        } else {
          res.status(401).send("wrong password");
        }
      });
    } else {
      res.status(401).send("user not found");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
