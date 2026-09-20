const dotenv = require("dotenv").config();
// const path = require("path");

// Load .env from project root


const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),

  // SMTP Settings
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "465", 10),
  SMTP_SECURE: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",

  // Recipient & Sender
  RECEIVER_EMAIL: process.env.RECEIVER_EMAIL || process.env.SMTP_USER || "",
  SENDER_NAME: process.env.SENDER_NAME || "Mohamadhu Ashik Portfolio",

  // CORS Settings
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "*",
};

module.exports = env;
