/** @format */

const router = require("express").Router();

const {
  getCategories,
  getCategoryById,
  updateCategory,
    deleteCategory,
  createCategory,
} = require("../controllers/category-controllers");

router.route("/").get(getCategories).post(createCategory);

router.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

module.exports = router;
