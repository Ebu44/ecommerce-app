const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/env/keys");

/**
 * @api {post} /register Register User
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiParam {Email} email Email of the User.
 * @apiParam {String} password Password of the User.
 * @apiParam {String} firstname Firstname of the User.
 * @apiParam {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *      {
 *       "is_deleted": false,
 *       "is_active": false,
 *       "is_staff": false,
 *       "_id": "610149e06a36941b5867da73",
 *       "email": "ebubekiryusuf44@hotmail.com",
 *       "hashed_password": "$2b$10$ebVUfkYx.z2fqE.iUEWAMehkuGMQJPfW8WpKzJ4MoaK5xzU2/MCpq",
 *       "first_name": "Ebubekir",
 *       "last_name": "Doğan",
 *       "slug": "ebubekirdoğan",
 *       "createdAt": "2021-07-28T12:13:20.929Z",
 *       "updatedAt": "2021-07-28T12:13:20.929Z",
 *       "__v": 0
 *     }
 *
 * @apiError User already registered.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": false,
 *       "message": "User already registered"
 *     }
 */

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
    res.status(400).json({ status: false, message: "User already registered" });
  }
});

/**
 * @api {post} /login Login User
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {Email} email  Email of the User.
 * @apiParam {String} password Password of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "status": true,
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVidWJla2lyeXVzdWY0NEBob3RtYWlsLmNvbSIsImlhdCI6MTYyNzQ3NTc4MywiZXhwIjoxNjI3NDc2NTAzfQ.issqAycd6XGX2yctNpxQvMI9XDKm_N8Kunp_NB82APs"
 *     }
 *
 * @apiError WrongPassword Wrong password.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        "status": false,
 *        "message": "Wrong password"
 *     }
 *
 * @apiError UserNotFound Can't find user.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *      {
 *        "status": false,
 *        "message": "Can't find user"
 *      }
 */

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

/**
 * @api {get} /api/user/:slug Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} slug Users unique Slug.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *       "is_deleted": false,
 *       "is_active": false,
 *       "is_staff": false,
 *       "_id": "610149e06a36941b5867da73",
 *       "email": "ebubekiryusuf44@hotmail.com",
 *       "hashed_password": "$2b$10$ebVUfkYx.z2fqE.iUEWAMehkuGMQJPfW8WpKzJ4MoaK5xzU2/MCpq",
 *       "first_name": "Ebubekir",
 *       "last_name": "Doğan",
 *       "slug": "ebubekirdoğan",
 *       "createdAt": "2021-07-28T12:13:20.929Z",
 *       "updatedAt": "2021-07-28T12:13:20.929Z",
 *       "__v": 0
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

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
