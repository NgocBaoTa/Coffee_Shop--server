/** @format */

const router = require("express").Router();

const { login, register, logout } =
  require("../controllers/customer-controllers");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);

module.exports = router;
