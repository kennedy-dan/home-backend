const express = require("express");
const router = express.Router();
const { createProduct, getProduct, getProductBySlug, getProductById } = require("../controllers/product");


router.post("/product/create", createProduct);
router.get("/product/get", getProduct)
router.get('/product/get/:slug', getProductBySlug)
router.get('/products/get/:_id', getProductById)

module.exports = router;
