/** @format */

const Order = require("../models/Order");

const OrderController = {
  getOrders(req, res) {
    const { customerId, orderDate, orderPayMethod, orderPhone } = req.query;
    let query = {};

    if (customerId) query.customerId = new ObjectID(customerId);
    if (orderDate) query.orderDate = orderDate;
    if (orderPhone) query.orderPhone = orderPhone;
    if (orderPayMethod) query.orderPayMethod = orderPayMethod;

    Order.find(query)
      .select("-__v")
      .then((orderData) => {
        if (!orderData || orderData.length === 0) {
          res.status(400).json({ message: "Order not found." });
        } else {
          res.json(orderData);
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  },

  getOrderById(req, res) {
    Order.findOne({ _id: req.params.id })
      .select("-__v")
      .then((orderData) => {
        if (!orderData) {
          res.status(400).json({ message: "Order not found." });
        } else {
          res.status(200).json(orderData);
        }
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },

  createOrder(req, res) {
    Order.create(req.body)
      .then((newOrder) => {
        res.status(200).json(newOrder);
      })
      .catch((error) => {
        res.status(400).json(error.message);
      });
  },

  deleteOrder(req, res) {
    if (req.session.admin) {
      Order.findOneAndDelete({ _id: req.params.id })
        .then((orderData) => {
          if (!orderData) {
            res.status(400).json({ message: "Order not found." });
          } else {
            res.status(200).json(orderData);
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  },
};

module.exports = OrderController;
