const Product = require("../models/Product");

const createProduct = async (req, res) => {
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

  try {
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
    res.status(201).send(product);
  } catch (err) {
    res.send(err);
  }
};

const getProduct = async (req, res) => {
  const perPage = 12;
  let page = parseInt(req.query.page) || 1;

  const products = await Product.find()
    .limit(perPage)
    .skip(perPage * page - perPage);

  res.send(products);
};

const searchProduct = async (req, res) => {
  const searchedProduct = await Product.find({
    title: { $regex: ".*" + req.query.search + ".*" },
  });
  res.send(searchedProduct);
};

const imageUpload = async (req, res) => {
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
};

module.exports = {
  createProduct,
  getProduct,
  searchProduct,
  imageUpload,
};
