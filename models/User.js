const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "`{PATH} is must be valid`"],
    unique: [true, "`{PATH} must be unique`"],
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  slug: {
    type: String,
    unique: [true, "`{PATH} must be unique`"],
  },
  password: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  is_staff: {
    type: Boolean,
    default: false,
  },
});

UserSchema.set("timestamps", true);

UserSchema.methods.generateJwtFromUser = function () {
  const { JWT_SECRET_KEY } = require("../config/env/keys");

  const payload = {
    id: this._id,
    email: this.email,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: 720,
  });

  return token;
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
