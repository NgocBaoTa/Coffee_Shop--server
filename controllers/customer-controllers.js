/** @format */

const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

const CustomerController = {
  getCustomers(req, res) {
    if (req.session.admin) {
      const { username, email } = req.query;
      let query = {};

      if (username) query.username = username;
      if (email) query.email = email;

      Customer.find(query)
        .select("-__v")
        .then((customerData) => {
          if (!customerData || customerData.length === 0) {
            res.status(400).json({ message: "Customer not found." });
          } else {
            res.json(customerData);
          }
        })
        .catch((err) => res.status(400).json({ message: err.message }));
    } else {
      Customer.findOne({ _id: req.session.customerID })
        .then((customerData) => {
          if (!customerData) {
            res.status(400).json({ message: "Customer not found." });
          } else {
            res.json(customerData);
          }
        })
        .catch((err) => res.status(400).json({ message: err.message }));
    }
  },

  getCustomerById(req, res) {
    Customer.findOne({ _id: req.params.id })
      .select("-__v")
      .then((customerData) => {
        if (!customerData) {
          res.status(400).json({ message: "Customer not found." });
        } else {
          res.status(200).json(customerData);
        }
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },

  updateCustomer(req, res) {
    if (req.session.loggedIn) {
      Customer.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then((customerData) => {
          if (!customerData) {
            res.status(400).json({ message: "Customer not found." });
          } else {
            res.status(200).json(customerData);
          }
        })
        .catch((err) => res.status(500).json(err));
    }
  },

  deleteCustomer(req, res) {
    if (req.session.admin) {
      Customer.findOneAndDelete({ _id: req.params.id })
        .then((customerData) => {
          if (!customerData) {
            res.status(400).json({ message: "Customer not found." });
          } else {
            res.status(200).json(customerData);
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      Customer.findOneAndDelete({ _id: req.session.customerID })
        .then((customerData) => {
          if (!customerData) {
            res.status(400).json({ message: "Customer not found." });
          } else {
            res.status(200).json(customerData);
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  },

  login(req, res) {
    const { email, password } = req.body;
    if (email.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    } else if (password.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    Customer.findOne({ email })
      .then((customerData) => {
        if (!customerData) {
          return res
            .status(400)
            .json({ success: false, message: "Incorrect email or password" });
        } else {
          bcrypt
            .compare(password, customerData.password)
            .then((checkPassword) => {
              if (!checkPassword) {
                return res.status(400).json({
                  success: false,
                  message: "Incorrect email or password",
                });
              }
              req.session.save(() => {
                req.session.customerID = customerData._id;
                req.session.username = customerData.username;
                req.session.email = customerData.email;
                req.session.loggedIn = true;
                req.session.admin = false;

                res.json({ success: true, customer: customerData });
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },

  register(req, res) {
    Customer.create(req.body)
      .then((customerData) =>
        res.json({ success: true, customer: customerData })
      )
      .catch((err) => {
        if (err.errors) {
          if (err.errors.username) {
            return res.status(400).json(err.errors.username.message);
          } else if (err.errors.email) {
            return res.status(400).json(err.errors.email.message);
          } else if (err.errors.password) {
            return res.status(400).json(err.errors.password.message);
          }
        }
        res.status(400).json(err.message);
      });
  },

  logout(req, res) {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.clearCookie("coffee_session");
        res.status(204).end();
      });
    } else res.status(404).end();
  },

  getSessionCheck(req, res) {
    if (req.session.loggedIn) res.status(200).json({ success: true });
    else res.status(200).json({ success: false });
  },
};

module.exports = CustomerController;
