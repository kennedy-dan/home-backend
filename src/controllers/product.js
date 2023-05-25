const Product = require("../model/product");
const slugify = require("slugify");
const Category = require("../model/category");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "drxdger3x",
  api_key: "597494831934642",
  api_secret: "gIr8Q_9aGE2pETYZrluxM_EMca0",
});

exports.createProduct = async (req, res) => {
  let imagesLinks = [];

  const images = req.body.images;

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "drxdger3x/home/products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const prod = await Product.create(req.body);

  res.status(200).json({
    success: true,
    prod,
  });
};

exports.getProduct = async (req, res) => {
  const products = await Product.find({})
    .populate({ path: "category", select: "_id name" })
    .exec();
  res.status(200).json({ products });
};

exports.getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const categoryId = await Product.find({})
    .populate({ path: "category", select: "slug" })
    .exec();

  // console.log(categoryId)

  const products = categoryId.filter(
    (slug) => slug.category.slug === req.params.slug
  );
  res.status(200).json({
    success: true,
    products,
  });
};

exports.getProductById = async (req, res) => {
  const { _id } = req.params;
  if (_id) {
    Product.findById({ _id })
      .populate({ path: "category", select: "_id name" })
      .exec((err, product) => {
        if (err) return res.status(400).json({ err });
        if (product) return res.status(200).json({ product });
      });
  } else {
    return res.status(400).json({ error: "params required" });
  }
};

exports.createProductReview = async (req, res) => {
  // const { _id } = req.params;

  const { rating, comment, productId, name } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    name,
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
        review.name = name
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};
