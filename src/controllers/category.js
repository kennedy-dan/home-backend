const slugify = require("slugify");
const Category = require("../model/category");
const shortId = require("shortid");

exports.createCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}`,
  };

  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) return res.status(400).json({ err });
    if (category) return res.status(201).json({ category });
  });
};
exports.getCategories = async (req, res) => {
  const categories = await Category.find({}).exec();
  res.status(200).json({ categories });
};

exports.getCategoriesById = async (req, res) => {
  const { slug } = req.params;

  const categoryId = await Category.findOne({ slug: slug });
  res.status(200).json({
    success: true,
    categoryId,
  });
};


exports.getCategoriesById = async (req, res) => {
  const { slug } = req.params;

  const categoryId = await Category.findOne({ slug: slug });
  res.status(200).json({
    success: true,
    categoryId,
  });
};