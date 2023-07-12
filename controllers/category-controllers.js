/** @format */

const Category = require("../models/Category");

const CategoryController = {
  getCategories(req, res) {
    const { categoryName } = req.query;
    let query = {};

    if (categoryName) query.categoryName = categoryName;
    Category.find(query)
      .select("-__v")
      .then((categoryData) => {
        if (!categoryData || categoryData.length === 0) {
          res.status(400).json({ message: "Category not found." });
        } else {
          res.json(categoryData);
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  },

  getCategoryById(req, res) {
    Category.findOne({ _id: req.params.id })
      .select("-__v")
      .then((categoryData) => {
        if (!categoryData) {
          res.status(400).json({ message: "Category not found." });
        } else {
          res.status(200).json(categoryData);
        }
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },

  createCategory(req, res) {
    if (req.session.admin) {
      Category.findOne({ categoryName: req.body.categoryName })
        .then((categoryData) => {
          if (categoryData) {
            res.status(400).json({ message: "Category is already exited." });
          } else {
            Category.create(req.body)
              .then((newCategory) => {
                res.status(200).json(newCategory);
              })
              .catch((error) => {
                res.status(400).json(error.message);
              });
          }
        })
        .catch((err) => res.status(500).json(err));
    }
  },

  updateCategory(req, res) {
    if (req.session.admin) {
      Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true,
      })
        .then((categoryData) => {
          if (!categoryData) {
            res.status(400).json({ message: "Category not found." });
          } else {
            res.status(200).json(categoryData);
          }
        })
        .catch((err) => res.status(500).json(err));
    }
  },

  deleteCategory(req, res) {
    if (req.session.admin) {
      Category.findOneAndDelete({ _id: req.params.id })
        .then((categoryData) => {
          if (!categoryData) {
            res.status(400).json({ message: "Category not found." });
          } else {
            res.status(200).json(categoryData);
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  },
};

module.exports = CategoryController;
