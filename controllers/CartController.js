const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");

const createCart = asyncHandler(async (req, res) => {
  const { items, totalQty, totalCost } = req.body;

  const cart = await Cart.create({
    user: req.params.id,
    items,
    totalQty,
    totalCost,
  });
  res.json({
    success: true,
    message: "Cart created",
    data: cart,
  });
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({
    user: req.params.id,
  });

  if (cart) {
    res.json({
      success: true,
      data: cart,
    });
  } else {
    res.json({
      success: true,
      message: "There isn't any cart",
    });
  }
});

module.exports = {
  getCart,
  createCart,
};
