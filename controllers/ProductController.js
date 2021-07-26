const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  const {
    category,
    productCode,
    title,
    slug,
    imagePath,
    description,
    price,
    totalQty,
    available,
  } = req.body;

  const product = await Product.create({
    category,
    productCode,
    title,
    slug,
    imagePath,
    description,
    price,
    totalQty,
    available,
  });
  res.status(201).json({
    success: true,
    message: "Product successfully created",
    data: product,
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const perPage = 12;
  let page = parseInt(req.query.page) || 1;

  const products = await Product.find()
    .limit(perPage)
    .skip(perPage * page - perPage);

  res.json({
    success: true,
    data: products,
  });
});

const searchProduct = asyncHandler(async (req, res) => {
  const searchedProduct = await Product.find({
    title: { $regex: ".*" + req.query.search + ".*" },
  });
  res.json({
    success: true,
    data: searchedProduct,
  });
});

const imageUpload = asyncHandler(async (req, res) => {
  await Product.findByIdAndUpdate(
    req.params.id,
    {
      profile_image: req.savedProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Image Upload Successfully",
  });
});

module.exports = {
  createProduct,
  getProduct,
  searchProduct,
  imageUpload,
};
