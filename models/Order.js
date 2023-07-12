/** @format */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customerID: [{ type: Schema.Types.ObjectId, ref: "Customer" }],
    orderProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    orderAddress: {
      type: String,
      required: true,
    },
    orderPhone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v);
        },
        message: "Phone number is invalid!",
      },
      required: [true, "Phone number is missing."],
    },
    orderPayMethod: {
      type: String,
      required: [true, "Payment method is missing."],
    },
    orderSubtotal: {
      type: Number,
      required: [true, "Subtotal is missing."],
    },
    orderTax: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Orders",
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

module.exports = mongoose.model("Order", orderSchema);
