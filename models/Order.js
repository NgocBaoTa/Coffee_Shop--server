/** @format */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customerID: { type: Schema.Types.ObjectId, ref: "Customer" },
    orderProducts: [
      {
        productID: { type: Schema.Types.ObjectId, ref: "Product" },
        noOfItems: { type: Number },
      },
    ],
    orderAddress: {
      type: String,
      required: true,
    },
    orderPhone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            v
          );
        },
        message: "Phone number is invalid!",
      },
      required: [true, "Phone number is missing."],
    },
    orderPayMethod: {
      type: String,
      required: [true, "Payment method is missing."],
    },
    orderCardholder: {
      type: String,
      required: [true, "Cardholder is missing."],
    },
    orderCardNumber: {
      type: Number,
      required: [true, "Card number is missing."],
      validate: {
        validator: function (value) {
          return value.toString().length === 19;
        },
        message: () => `Card number must be a 19-digit number.`,
      },
    },
    orderExpireDate: {
      type: String,
      required: [true, "Card's expire date is missing."],
    },
    orderCVC: {
      type: Number,
      required: [true, "CVC is missing."],
      validate: {
        validator: function (value) {
          return value.toString().length === 3;
        },
        message: () => `CVC must be a 3-digit number.`,
      },
    },
    orderSubtotal: {
      type: Number,
      required: [true, "Subtotal is missing."],
    },
    // orderTax: {
    //   type: Number,
    //   required: true,
    // },
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
