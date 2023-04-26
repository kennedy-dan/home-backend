const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getProductBySlug,
  getProductById,
  createProductReview,
} = require("../controllers/product");

router.post("/product/create", createProduct);
router.get("/product/get", getProduct);
router.get("/product/get/:slug", getProductBySlug);
router.get("/products/get/:_id", getProductById);
router.put("/product/reviews", createProductReview);

module.exports = router;
