const Category = require("../models/Category");

const createCategory = async (req, res) => {
  const { title, slug } = req.body;

  const category = await Category.create({
    title,
    slug,
  });

  res.status(201).send(category);
};

const getCategories = async (req, res) => {
  const categories = await Category.find();

  res.send(categories);
};

module.exports = {
  createCategory,
  getCategories,
};
