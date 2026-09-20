/**
 * Optional Local Mock SMTP Server
 * Runs a lightweight local SMTP server on port 2525 for offline testing and debugging.
 * Run with:
 *   npm run smtp:receiver
 */
const { SMTPServer } = require("smtp-server");

const PORT = process.env.LOCAL_SMTP_PORT || 2525;

const server = new SMTPServer({
  // Disable authentication requirements for easy local development
  authOptional: true,
  disabledCommands: ["AUTH"],

  onData(stream, session, callback) {
    let rawEmail = "";
    stream.on("data", (chunk) => {
      rawEmail += chunk.toString("utf8");
    });

    stream.on("end", () => {
      console.log("\n==============================================");
      console.log(`📥 [LOCAL SMTP] Received Incoming Email`);
      console.log(`From: ${session.envelope.mailFrom.address}`);
      console.log(`To: ${session.envelope.rcptTo.map((r) => r.address).join(", ")}`);
      console.log("---------------- Content --------------------");
      console.log(rawEmail);
      console.log("==============================================\n");
      callback(null); // Accept message
    });
  },
});

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`📬 Local Mock SMTP Server listening on port ${PORT}`);
  console.log(`Point your local apps to: localhost:${PORT} (no auth needed)`);
  console.log(`=========================================`);
});
