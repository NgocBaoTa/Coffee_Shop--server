/** @format */

const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const AdminController = {
  getAdmins(req, res) {
    if (req.session.admin) {
      const { username, email } = req.query;
      let query = {};

      if (username) query.username = username;
      if (email) query.email = email;

      Admin.find(query)
        .select("-__v")
        .then((adminData) => {
          if (!adminData || adminData.length === 0) {
            res.status(400).json({ message: "Admin not found." });
          } else {
            res.json(adminData);
          }
        })
        .catch((err) => res.status(400).json({ message: err.message }));
    }
  },

  getAdminById(req, res) {
    Admin.findOne({ _id: req.params.id })
      .select("-__v")
      .then((adminData) => {
        if (!adminData) {
          res.status(400).json({ message: "Admin not found." });
        } else {
          res.status(200).json(adminData);
        }
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },

  updateAdmin(req, res) {
    Admin.findOneAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
    })
      .then((adminData) => {
        if (!adminData) {
          res.status(400).json({ message: "Admin not found." });
        } else {
          res.status(200).json(adminData);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteAdmin(req, res) {
    if (req.session.admin) {
      Admin.findOneAndDelete({ _id: req.session.adminID })
        .then((adminData) => {
          if (!adminData) {
            res.status(400).json({ message: "Admin not found." });
          } else {
            res.status(200).json(adminData);
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
    Admin.findOne({ email }).then((adminData) => {
      if (!adminData) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email or password" });
      } else {
        let checkPassword = bcrypt.compare(password, adminData.password);

        if (!checkPassword) {
          return res
            .status(400)
            .json({ success: false, message: "Incorrect email or password" });
        }

        req.session.save(() => {
          req.session.adminID = adminData._id;
          req.session.username = adminData.username;
          req.session.email = adminData.email;
          req.session.loggedIn = true;
          req.session.admin = true;

          res.json({ success: true, admin: adminData });
        });
      }
    });
  },

  register(req, res) {
    Admin.create(req.body)
      .then((adminData) => res.json({ success: true, admin: adminData }))
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
        res.status(204).end();
      });
    } else res.status(404).end();
  },
};

module.exports = AdminController;
