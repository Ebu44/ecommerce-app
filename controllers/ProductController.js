const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const {
    category,
    productCode,
    title,
    imagePath,
    description,
    price,
    manufacturer,
    available,
  } = req.body;

  try {
    const product = await Product.create({
      category,
      productCode,
      title,
      imagePath,
      description,
      price,
      manufacturer,
      available,
    });
    res.status(201).send(product);
  } catch (err) {
    res.send(err);
  }
};

const getProduct = async (req, res) => {
  const products = await Product.find().limit(Number(req.query.limit));

  res.send(products);
};

module.exports = {
  createProduct,
  getProduct,
};
