const express = require("express");
const router = express.Router();
const { addPost, getSinglePost, getPost } = require("../controllers/blog");

router.post("/createblog", addPost);
router.get("/blog", getPost);
router.get('/getblog/:slug', getSinglePost);

// router.get('/category/getcategory', getCategory)
// router.post("/category/update",upload.array('categoryImage'),updateCategory);
// router.post("/category/delete",deleteCategory);

module.exports = router;
