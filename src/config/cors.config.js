const env = require("./env.config");

const allowedOrigins = env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim());

const corsOptions = {
  origin: (origin, callback) => {

    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS Error: Access from origin '${origin}' is not allowed.`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = corsOptions;
