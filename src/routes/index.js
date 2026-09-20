const { Router } = require("express");
const emailRoutes = require("./email.routes");
const healthRoutes = require("./health.routes");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    service: "Node.js SMTP Email Server API",
    version: "1.0.0",
    architecture: "Modular Functional Architecture",
    endpoints: {
      health: "GET /api/health",
      contact: "POST /api/contact",
      sendAlias: "POST /api/send",
      custom: "POST /api/custom",
    },
    documentation: "See README.md for full specs",
  });
});


router.use("/", healthRoutes);
router.use("/", emailRoutes);

module.exports = router;
