/** @format */

const Product = require("../models/Product");
const Category = require("../models/Category");

const ProductController = {
  async getProducts(req, res) {
    const { productName, categoryName } = req.query;
    let categoryID;
    if (categoryName) {
      let category = await Category.findOne({ categoryName: categoryName });
      categoryID = category.id;
    }
    let query = {};

    if (categoryName) query.categoryID = categoryID;
    if (productName) query.productName = productName;

    Product.find(query)
      .select("-__v")
      .then((productData) => {
        if (!productData) {
          res.status(400).json({ message: "Product not found." });
        } else {
          res.json(productData);
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  },

  getProductById(req, res) {
    Product.findOne({ _id: req.params.id })
      .select("-__v")
      .then((productData) => {
        if (!productData) {
          res.status(400).json({ message: "Product not found." });
        } else {
          res.status(200).json(productData);
        }
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },

  createProduct(req, res) {
    if (req.session.admin) {
      Product.create(req.body)
        .then((newProduct) => {
          res.status(200).json(newProduct);
        })
        .catch((error) => {
          res.status(400).json(error.message);
        });
    }
  },

  updateProduct(req, res) {
    if (req.session.admin) {
      Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true,
      })
        .then((productData) => {
          if (!productData) {
            res.status(400).json({ message: "Product not found." });
          } else {
            res.status(200).json(productData);
          }
        })
        .catch((err) => res.status(500).json(err));
    }
  },

  deleteProduct(req, res) {
    if (req.session.admin) {
      Product.findOneAndDelete({ _id: req.params.id })
        .then((productData) => {
          if (!productData) {
            res.status(400).json({ message: "Product not found." });
          } else {
            res.status(200).json(productData);
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  },

  searchProduct(req, res) {
    const { searchText } = req.query;
    if (searchText.length === 0) {
      Product.find({})
        .then((productData) => {
          res.status(200).json(productData);
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    } else {
      Product.find({ $text: { $search: searchText } })
        .then((productData) => {
          if (!productData || productData.length === 0) {
            res.status(200).json({ message: "Product not found" });
          } else {
            res.status(200).json(productData);
          }
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    }
  },

  getNewCoffee(req, res) {
    let category = Category.findOne({ categoryName: req.query.categoryName });
    let categoryID = category._id.toString();
    Product.find({ categoryID })
      .select("-__v")
      .sort({ createAt: -1 })
      .limit(5)
      .then((productData) => {
        res.status(200).json(productData);
      })
      .catch((error) => {
        res.status(400).json(error.message);
      });
  },

  getRecommendedProduct(req, res) {
    let category = Category.findOne({ categoryName: "Product" });
    let categoryID = category._id.toString();
    Product.find({ categoryID })
      .select("-__v")
      .sort({ createAt: -1 })
      .limit(5)
      .then((productData) => {
        res.status(200).json(productData);
      })
      .catch((error) => {
        res.status(400).json(error.message);
      });
  },

  getBestSeller(req, res) {
    let category = Category.findOne({ categoryName: "Coffee" });
    let categoryID = category._id.toString();
    Product.find({ categoryID })
      .select("-__v")
      .sort({ productSold: -1 })
      .limit(3)
      .then((productData) => {
        res.status(200).json(productData);
      })
      .catch((error) => {
        res.status(400).json(error.message);
      });
  },
};

module.exports = ProductController;
