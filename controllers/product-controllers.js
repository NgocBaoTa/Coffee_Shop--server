/** @format */

const Product = require("../models/Product");
const Category = require("../models/Category");

const ProductController = {
  async getProducts(req, res) {
    const { productName, categoryName } = req.query;
    let query = {};

    if (categoryName) query.categoryName = categoryName;
    if (productName) query.productName = productName;

    await Product.find(query)
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

  async getProductById(req, res) {
    await Product.findOne({ _id: req.params.id })
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

  async createProduct(req, res) {
    if (req.session.admin) {
      await Product.create(req.body)
        .then((newProduct) => {
          res.status(200).json(newProduct);
        })
        .catch((error) => {
          res.status(400).json(error.message);
        });
    }
  },

  async updateProduct(req, res) {
    // if (req.session.admin) {
    await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
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
    // }
  },

  async deleteProduct(req, res) {
    if (req.session.admin) {
      await Product.findOneAndDelete({ _id: req.params.id })
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

  async searchProduct(req, res) {
    const { searchText } = req.query;
    if (searchText.length === 0) {
      await Product.find({ categoryName: "Product" })
        .then((productData) => {
          res.status(200).json(productData);
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    } else {
      await Product.find({
        categoryName: "Product",
        productName: { $regex: searchText, $options: "i" },
      })
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

  async getNewCoffee(req, res) {
    await Product.find({ categoryName: "Coffee" })
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

  async getRecommendedProduct(req, res) {
    await Product.find({ categoryName: "Product" })
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

  async getBestSeller(req, res) {
    await Product.find({ categoryName: "Coffee" })
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
