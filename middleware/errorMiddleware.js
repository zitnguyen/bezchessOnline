const AppError = require("../utils/AppError");

const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Default values
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  if (!error.status) {
    error.status = "error";
  }

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    error = new AppError("Invalid ID format", 400);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    error = new AppError("Duplicate field value entered", 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    error = new AppError(
      Object.values(err.errors)
        .map((val) => val.message)
        .join(", "),
      400,
    );
  }

  res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorMiddleware;
