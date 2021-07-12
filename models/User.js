const mongoose = require("mongoose");

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
  hashed_password: {
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

module.exports = mongoose.model("User", UserSchema);
