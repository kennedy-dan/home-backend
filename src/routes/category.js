const express = require("express");
const router = express.Router();
const { createCategory, getCategories, getCategoriesById } = require("../controllers/category");

router.post("/category/create", createCategory);
router.get("/category/get", getCategories)
router.get('/category/get/:slug', getCategoriesById)
// router.get('/category/getcategory', getCategory)
// router.post("/category/update",upload.array('categoryImage'),updateCategory);
// router.post("/category/delete",deleteCategory);

module.exports = router;
