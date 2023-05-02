const express = require("express");
const { addToCart, getCartItems } = require("../controllers/cart");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/user/cart/addtoCart", addToCart);
router.get("/user/getCartItems", getCartItems);
module.exports = router;
