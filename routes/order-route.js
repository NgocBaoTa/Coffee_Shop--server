/** @format */

const router = require("express").Router();

const {
  getOrders,
  getOrderById,
  deleteOrder,
  createOrder,
} = require("../controllers/order-controllers");

router.route("/").post(createOrder);

router.route("/search").get(getOrders);

router
  .route("/:id")
  .get(getOrderById)
  .delete(deleteOrder);

module.exports = router;
