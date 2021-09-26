const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Product Name"],
    trim: true,
    maxLength: [100, "Name Cannot Exceed 100 Characters"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter a Product Price"],
    maxLength: [10, "Name Cannot Exceed 10 Characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please Enter a Product Description"],
  },
  ratings: {
    type: Number,
    default: 0.0,
  },
  images: [
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Select a Product Category"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Mobiles",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please Select A Valid Category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please Enter a Product Seller Name"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter a Stock Number"],
    maxLength: [5, "Stock Cannot Exceed 5 Characters"],
    default: 0,
  },
  numOfReviews: {
    type: String,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  //--PRO-- Archive 1 -- Pcontroller--
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
