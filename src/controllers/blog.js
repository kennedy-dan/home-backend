const slugify = require("slugify");
const Blog = require("../model/blog");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "drxdger3x",
  api_key: "597494831934642",
  api_secret: "gIr8Q_9aGE2pETYZrluxM_EMca0",
});

exports.addPost = async (req, res) => {

  const images = req.body.images;

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images, {
      folder: "drxdger3x/home/products",
    });
    req.body.images = { images: result.secure_url };
    slug: `${slugify(req.body.name)}`,
    console.log(images);

  }

 const data = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}`,
    post: req.body.post,
    images: req.body.images
  }

  const blog = await Blog.create(data);
  slug: `${slugify(req.body.name)}`,
  res.status(200).json({
    success: true,
    blog,
  });
};

exports.getPost = async (req, res) => {
  const blog = await Blog.find();
  console.log(blog);

  res.status(200).json({
    success: true,
    blog,
  });
};

exports.getSinglePost = async (req, res) => {
  const { slug } = req.params;

  const blog = await Blog.findOne({ slug: slug });

  res.status(200).json({
    success: true,
    blog,
  });
};
