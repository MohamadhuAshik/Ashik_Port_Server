const env = require("../config/env.config");


function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: `Endpoint '${req.method} ${req.originalUrl}' not found.`,
  });
}


function globalErrorHandler(err, req, res, next) {
  console.error("[ERROR]", err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    error: err.message || "Internal Server Error",
  };

  if (env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = {
  notFoundHandler,
  globalErrorHandler,
};
