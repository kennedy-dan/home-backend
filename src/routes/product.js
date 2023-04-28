const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getProductBySlug,
  getProductById,
  createProductReview,
} = require("../controllers/product");
const { requireSignin, userMiddleware } = require("../middleware");


router.post("/product/create", createProduct);
router.get("/product/get", getProduct);
router.get("/product/get/:slug", getProductBySlug);
router.get("/products/get/:_id", getProductById);
router.put("/product/reviews",requireSignin, createProductReview);

module.exports = router;
