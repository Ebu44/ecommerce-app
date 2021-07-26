const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/env/keys");

const register = asyncHandler(async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  const user = await User.findOne({
    email,
  });

  const full_name = first_name + last_name;
  const slug = full_name.toLowerCase();

  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    const data = await User.create({
      email,
      hashed_password: hash,
      first_name,
      last_name,
      slug,
      is_deleted: false,
      is_active: false,
      is_staff: false,
    });
    res.status(201).json(data);
  } else {
    res.json({ status: false, message: "User already registered" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user) {
    const result = await bcrypt.compare(password, user.hashed_password);
    if (result) {
      const payload = {
        email,
      };
      const token = await jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: 720,
      });
      res.json({ status: true, token: token });
    } else {
      res.json({ status: false, message: "Wrong password" });
    }
  } else {
    res.json({ status: false, message: "Can't find user" });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    slug: req.params.slug,
  });
  res.json(user);
});

module.exports = {
  register,
  login,
  getUser,
};
