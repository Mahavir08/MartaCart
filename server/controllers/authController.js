const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "12",
      url: "12",
    },
  });

  sendToken(user, 200, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if user entered an email or password
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter An Email Or Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  //correct email entered or not
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password"), 401);
  }

  //Password Entered is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email id or password"), 400);
  } else {
    sendToken(user, 200, res);
  }
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out Successfully",
  });
});

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const UserBody = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, UserBody, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Not Found with id ${req.params.id}`, 400)
    );
  } else {
    res.status(200).json({
      success: true,
      user,
    });
  }
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const UserBody = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, UserBody, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("Invalid User ", 401));
  } else {
    await User.remove();
    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  }
});
