const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  const { items, totalQty, totalCost } = req.body;

  try {
    const cart = await Cart.create({
      user: req.params.id,
      items,
      totalQty,
      totalCost,
    });
    res.send(cart);
  } catch (err) {
    res.send(err);
  }
};

const getCart = async (req, res) => {
  const cart = await Cart.find({
    user: req.params.id,
  });

  if (cart) {
    res.send(cart);
  } else {
    res.send("There isn't any cart");
  }
};

module.exports = {
  getCart,
  createCart,
};
