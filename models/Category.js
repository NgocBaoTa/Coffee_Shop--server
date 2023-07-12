/** @format */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Product's name is missing."],
    },
  },
  {
    collection: "Categories",
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

module.exports = mongoose.model("Category", categorySchema);
