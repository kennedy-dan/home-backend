const express = require("express");
const { addToCart, getCartItems } = require("../controllers/cart");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/user/cart/addtoCart", requireSignin, addToCart);
router.get("/user/getCartItems", requireSignin, getCartItems);
module.exports = router;
