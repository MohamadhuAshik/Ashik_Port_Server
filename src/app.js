const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors.config");
const routes = require("./routes");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/error.middleware");

const app = express();

// 1. Global Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// 2. Request Logging (lightweight development logging)
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// 3. Mount API Routes
app.use("/api", routes);

// 4. Root Welcome Route
app.get("/", (req, res) => {
  res.redirect("/api");
});

// 5. Error Handling Middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
