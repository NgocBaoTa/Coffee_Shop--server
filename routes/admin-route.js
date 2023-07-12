/** @format */

const router = require("express").Router();

const { getAdmins, getAdminById, updateAdmin, deleteAdmin } =
  require("../controllers/admin-controllers");

router.route("/").get(getAdmins);

router.route("/:id").get(getAdminById).put(updateAdmin).delete(deleteAdmin);

module.exports = router;
