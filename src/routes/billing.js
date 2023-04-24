const express = require("express");
const { addAddress, getAddress } = require("../controllers/billing");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/user/address", requireSignin, addAddress);
router.get("/user/address", requireSignin, getAddress);
module.exports = router;
