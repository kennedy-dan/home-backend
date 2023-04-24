const express = require("express");
const { signup, signin  } = require("../controllers/user");
const router = express.Router();
// const { validatesignupRequest, isRequestValidated, validatesigninRequest } = require("../validators/auth");


router.post("/signup" ,signup) ;
router.post("/signin", signin);


module.exports = router;
