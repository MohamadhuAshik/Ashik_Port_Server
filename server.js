const app = require("./src/app");
const env = require("./src/config/env.config");

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("=================================================");
  console.log(`🚀 Node.js SMTP Server listening on port ${PORT}`);
  console.log(`🌐 Base URL:   http://localhost:${PORT}/api`);
  console.log(`🩺 Health:     http://localhost:${PORT}/api/health`);
  console.log(`📬 Send Email: http://localhost:${PORT}/api/contact`);
  console.log(`⚙️  Environment: ${env.NODE_ENV}`);
  console.log("=================================================");
});

// Graceful Shutdown
function handleShutdown(signal) {
  console.log(`\n[Server] Received ${signal}. Gracefully shutting down...`);
  server.close(() => {
    console.log("[Server] HTTP server closed.");
    process.exit(0);
  });

  // Force close if it takes too long
  setTimeout(() => {
    console.error("[Server] Force shutdown timeout reached.");
    process.exit(1);
  }, 5000);
}

process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));
