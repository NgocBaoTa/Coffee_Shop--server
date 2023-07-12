/** @format */

const router = require("express").Router();

const {
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer-controllers");

router.route("/").get(getCustomers);

router.route("/:id")
    .get(getCustomerById)
    .put(updateCustomer)
    .delete(deleteCustomer);

module.exports = router;
