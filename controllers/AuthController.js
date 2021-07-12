const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/env/keys");

const register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  const user = await User.findOne({
    email,
  });

  const full_name = first_name + last_name;
  const slug = full_name.toLowerCase();

  if (!user) {
    try {
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
      res.status(201).send(data);
    } catch (err) {
      res.status(401).send(err);
    }
  } else {
    res.send("User already registered");
  }
};

const login = async (req, res) => {
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
      res.send({ status: true, token: token });
    } else {
      res.send({ status: false, message: "Wrong password" });
    }
  } else {
    res.send("Please Register");
  }
};

const getUser = async (req, res) => {
  const user = await User.findOne({
    slug: req.params.slug,
  });
  res.send(JSON.stringify(user));
};

module.exports = {
  register,
  login,
  getUser,
};
