const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter A Name"],
    maxlength: [30, "Your Name Cannot Exceed 30 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter An Email-Id"],
    unique: [true, "The Email-Id Must be unique "],
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: [8, "Password cannot be less than 8 Characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Password Encryption Using bcryptjs
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

//Compare User Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//JWT TOKEN
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
