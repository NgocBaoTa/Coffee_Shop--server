const mongoose = require('mongoose');

const Customer = require('../models/Customer');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');

const seedCustomers = require('./customer-seeds');
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedAdmins = require("./admin-seeds");

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb+srv://baongocta:baongocta@cluster0.poueqht.mongodb.net/Coffee_Shop',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedData = async () => {
    const customerData = seedCustomers.map(
      async (customer) => {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        let password = await bcrypt.hash(customer.password, salt);
        customer.password = password;
        return customer;
    })
    
    const seedCustomerData = await Promise.all(customerData)

    await Customer.deleteMany({});
    await Customer.insertMany(seedCustomerData);

    console.log("- - - Seeded Customer Data - - -");

    await Category.deleteMany({});
    await Category.insertMany(seedCategories);

    console.log("- - - Seeded Category Data - - -");

    await Product.deleteMany({});
    await Product.insertMany(seedProducts);

    console.log("- - - Seeded Product Data - - -");

    await Admin.deleteMany({});
    await Admin.insertMany(seedAdmins);

    console.log("- - - Seeded Admin Data - - -");

}

seedData().then(() =>{
    mongoose.connection.close();
});