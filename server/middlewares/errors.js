const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      errStack: err.stack,
    });
  } else {
    let error = { ...err };
    error.message = err.message;

    // if (err.name === "JsonWebTokenError") {
    //   const message = "Invalid JsonWebToken Try AGAIN!!";
    //   error = new ErrorHandler(message, 400);
    // }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Product Not Found",
    });
  }
};
