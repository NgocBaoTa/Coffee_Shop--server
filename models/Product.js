/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    categoryName: { type: String, ref: "Category" },
    productName: {
      type: String,
      required: [true, "Product's name is missing."],
    },
    productDescription: {
      description: { type: String },
      story: { type: String },
      details: [{ type: String }],
    },
    productPrice: {
      type: Number,
      required: [true, "Product's price is missing."],
    },
    productQuantity: {
      type: Number,
      required: [true, "Product's quantity is missing."],
    },
    productSold: {
      type: Number,
      default: 0,
    },
    productImage: {
      type: String,
      required: [true, "Product's image is missing."],
    },
  },
  {
    collection: "Products",
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

productSchema.index({ productName: "text" });

module.exports = mongoose.model("Product", productSchema);
