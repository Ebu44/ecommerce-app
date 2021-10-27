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
  searchProduct,
  imageUpload,
} = require("../controllers/ProductController");

const profileImageUpload = require("../middleware/libraries/ImageUpload");

const router = express.Router();

router.post("/api/register", register);
router.post("/api/login", login);
router.get("/api/user/:slug", getUser);

router.get("/api/user/:id/cart", getCart);
router.post("/api/user/:id/cart", createCart);

router.post("/api/category", createCategory);
router.get("/api/category", getCategories);

router.post("/api/product", createProduct);
router.post(
  "/api/user/upload/:id",
  profileImageUpload.single("profile_image"),
  imageUpload
);
router.get("/product", getProduct);
router.get("/product/search", searchProduct);

//To-Do Order endpoints

module.exports = router;
