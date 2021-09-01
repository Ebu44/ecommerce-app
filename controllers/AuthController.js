const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const { NODE_ENV } = require("../config/env/keys");
const sendEmail = require("../helpers/email/emailSender");

const register = asyncHandler(async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  const user = await User.findOne({
    email,
  });

  const full_name = first_name + last_name;
  const slug = full_name.toLowerCase();

  if (!user) {
    const data = await User.create({
      email,
      password,
      first_name,
      last_name,
      slug,
      is_deleted: false,
      is_active: false,
      is_staff: false,
    });
    //sendEmail(user, slug);
    sendJwtToClient(data, res);
  } else {
    res.json({ status: false, message: "User already registered" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      sendJwtToClient(user, res);
    } else {
      res.json({ status: false, message: "Wrong password" });
    }
  } else {
    res.json({ status: false, message: "Can't find user" });
  }
});

const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ slug: req.params.slug });
  if (!user)
    return res.json({ success: false, message: "User does not exist" });
  return res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
    },
  });
});

module.exports = {
  register,
  login,
  logout,
  getUser,
};
