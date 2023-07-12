/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const customerSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is missing."],
    },
    email: {
      type: String,
      required: [true, "Email is missing."],
      unique: [true, "Email is already in use."],
      validate: {
        validator: function (v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]){2,6}$/.test(v);
        },
        message: "Email is invalid!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is missing."],
      minLength: [8, "Password must be at least 8 characters."],
    },
    avatarUrl: String,
    cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    boughtProduct: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    collection: "Customers",
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

customerSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Customer", customerSchema);
