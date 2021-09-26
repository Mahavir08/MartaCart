const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const products = require("../data/products");

dotenv.config({ path: "server/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products Deleted");

    await Product.insertMany(products);
    console.log("Inserted!");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
