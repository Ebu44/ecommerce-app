const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const { title, slug } = req.body;

  const category = await Category.create({
    title,
    slug,
  });

  res.status(201).json({
    success: true,
    message: "Category created",
    data: category,
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.send({
    success: true,
    data: categories,
  });
});

module.exports = {
  createCategory,
  getCategories,
};
