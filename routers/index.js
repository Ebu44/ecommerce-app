const express = require("express");
const { register, login, getUser } = require("../controllers/AuthController");
const { getCart, createCart } = require("../controllers/CartController");
const {
  createCategory,
  getCategories,
} = require("../controllers/CategoryController");
const {
  createProduct,
  getProduct,
} = require("../controllers/ProductController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/api/user/:slug", getUser);

router.get("/api/:id/cart", getCart);
router.post("/api/:id/cart", createCart);

router.post("/category", createCategory);
router.get("/category", getCategories);

router.post("/product", createProduct);
router.get("/product", getProduct);

//To-Do Order endpoints

module.exports = router;
