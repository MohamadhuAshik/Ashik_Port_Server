const { verifyConnection } = require("../services/email.service");
const env = require("../config/env.config");

async function checkHealth(req, res, next) {
  try {
    if (!env.SMTP_USER || !env.SMTP_PASS || env.SMTP_PASS === "your_app_password_here") {
      return res.status(200).json({
        status: "warning",
        server: "online",
        message: "Server is running, but SMTP credentials are not yet configured in .env",
        timestamp: new Date().toISOString(),
      });
    }

    await verifyConnection();

    return res.status(200).json({
      status: "healthy",
      server: "online",
      smtp: "connected",
      smtpHost: env.SMTP_HOST,
      smtpPort: env.SMTP_PORT,
      user: env.SMTP_USER,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      status: "unhealthy",
      server: "online",
      smtp: "connection_failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

module.exports = {
  checkHealth,
};
