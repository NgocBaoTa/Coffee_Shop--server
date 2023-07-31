/** @format */

const router = require("express").Router();

const customerRoute = require("./customer-route");
const adminRoute = require("./admin-route");
const cusAuthRoute = require("./cus_auth-route");
const adminAuthRoute = require("./admin_auth-route");
const productRoute = require("./product-route");
const categoryRoute = require("./category-route");
const orderRoute = require("./order-route");


router.use("/cus-auth", cusAuthRoute);
router.use("/admin-auth", adminAuthRoute);
router.use("/admins", adminRoute);
router.use("/customers", customerRoute);
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/orders", orderRoute);

module.exports = router;
