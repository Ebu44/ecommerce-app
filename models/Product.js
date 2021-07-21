const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalQty: {
    type: Number,
    default: 0,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

ProductSchema.set("timestamps", true);

module.exports = mongoose.model("Product", ProductSchema);
