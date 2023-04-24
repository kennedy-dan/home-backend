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

// exports.createProduct = (req, res) => {
//   const { name, price, description, category, createdBy, quantity } = req.body;

//   let productPictures = [];
//   if (req.files.length > 0) {
//     req.files.map((pix) => {
//       productPictures.push({ img: pix.filename });
//       return productPictures;
//     });
//   }

//   const product = new Product({
//     name: name,
//     slug: slugify(name),
//     price,
//     description,
//     productPictures,
//     category,
//     createdBy: req.user._id,
//     quantity,
//   });

//   product.save((err, product) => {
//     if (err) return res.status(400).json({ err });
//     if (product) return res.status(200).json({ product });
//   });
//   // res.status(200).json({file: req.files, body: req.body})
// };

// exports.getProductSlug = (req, res) => {
//   const { slug } = req.params;

//   Category.findOne({ slug: slug })
//     .select("_id type")
//     .exec((err, category) => {
//       if (err) return res.status(400).json({ err });
//       if (category)
//         Product.find({ category: category._id })
//         .exec((err, products) => {
//           if (err) return res.status(400).json({ err });
//           if (category.type) {
//             if (products.length > 0) {
//               return res.status(200).json({
//                 products,
//                 productsByPrice: {
//                   under50k: products.filter((product) => product.price < 50000),
//                   under100k: products.filter(
//                     (product) =>
//                       product.price < 100000 && product.price >= 50000
//                   ),
//                   under200k: products.filter(
//                     (product) =>
//                       product.price < 200000 && product.price >= 100000
//                   ),
//                   under800k: products.filter(
//                     (product) =>
//                       product.price <= 800000 && product.price >= 200000
//                   ),
//                 },
//               });
//             }
//           }else {
//             res.status(200).json({products})
//           }
//         });
//     });
// };

// exports.getProductDetailsId = (req, res) => {
//   const { productId } = req.params;
//   if (productId) {
//     Product.findOne({ _id: productId }).exec((err, product) => {
//       if (err) return res.status(400).json({ err });
//       if (product) return res.status(200).json({ product });
//     });
//   } else {
//     return res.status(400).json({ error: "params required" });
//   }
// };
