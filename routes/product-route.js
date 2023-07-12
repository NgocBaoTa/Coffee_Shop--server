/** @format */

const router = require("express").Router();

const {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
  getNewCoffee,
  getRecommendedProduct,
  getBestSeller,
  searchProduct,
} = require("../controllers/product-controllers");

router.route("/").get(getProducts).post(createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.route("/new-coffee").get(getNewCoffee);
router.route("/recommend-products").get(getRecommendedProduct);
router.route("/best-seller").get(getBestSeller);
router.route("/search").get(searchProduct);

module.exports = router;
