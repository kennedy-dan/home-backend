const express = require("express");
const { addAddress, getAddress } = require("../controllers/billing");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/user/address", requireSignin, addAddress);
router.get("/user/address", requireSignin, getAddress);
router.get("https://api.football-data.org/v4/matches");

module.exports = router;
