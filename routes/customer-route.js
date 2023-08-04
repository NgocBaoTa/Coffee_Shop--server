/** @format */

const router = require("express").Router();

const {
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getSessionCheck,
} = require("../controllers/customer-controllers");

router.route("/").get(getCustomers);

router.route("/check").get(getSessionCheck);
router.route("/:id")
    .get(getCustomerById)
    .put(updateCustomer)
    .delete(deleteCustomer);

module.exports = router;
