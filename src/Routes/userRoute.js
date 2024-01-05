const express = require("express");

const router = express.Router();

const {
  userRegistraion,
  userLogin,
  
} = require("../controllers/userController");

//user registraion route
router.post("/signup", userRegistraion)


// user login route
router.post("/login", userLogin) 

module.exports = router