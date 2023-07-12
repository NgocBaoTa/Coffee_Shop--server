/** @format */

const router = require("express").Router();

const {
  getOrders,
  getOrderById,
  deleteOrder,
  createOrder,
} = require("../controllers/order-controllers");

router.route("/").get(getOrders).post(createOrder);

router
  .route("/:id")
  .get(getOrderById)
  .delete(deleteOrder);

module.exports = router;
