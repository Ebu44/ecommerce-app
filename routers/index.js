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

const getAccessToRoute = require("../middleware/authorization/auth");
const profileImageUpload = require("../middleware/libraries/ImageUpload");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/api/user/:slug", getAccessToRoute, getUser);

router.get("/api/:id/cart", getCart);
router.post("/api/:id/cart", createCart);

router.post("/category", createCategory);
router.get("/category", getCategories);

router.post("/product", createProduct);
router.post(
  "/api/upload/:id",
  profileImageUpload.single("profile_image"),
  imageUpload
);
router.get("/product", getProduct);
router.get("/product/search", searchProduct);

//To-Do Order endpoints

module.exports = router;
