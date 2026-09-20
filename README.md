# Scalable Node.js SMTP Email Server

A production-ready, modular Node.js & Express server built with a clean **functional architecture**. Designed to scale seamlessly from simple contact form handling to enterprise transactional email pipelines, queues, and database logging.

---

## 🏗️ Architecture & Folder Structure

```
smtp-server/
├── src/
│   ├── config/
│   │   ├── env.config.js              # Centralized environment variables & defaults
│   │   ├── mailer.config.js           # Nodemailer SMTP transporter & verification
│   │   └── cors.config.js             # CORS origins & policy rules
│   │
│   ├── models/
│   │   └── email.model.js             # Email data schema & input validation constraints
│   │
│   ├── controllers/
│   │   ├── email.controller.js        # Request/response handlers for email actions
│   │   └── health.controller.js       # Health check & live SMTP connectivity verification
│   │
│   ├── services/
│   │   └── email.service.js           # Decoupled business logic for email dispatching
│   │
│   ├── templates/
│   │   └── contactEmail.template.js   # Responsive dark-mode branded HTML email template
│   │
│   ├── middlewares/
│   │   ├── validate.middleware.js     # Payload validation middleware using model rules
│   │   └── error.middleware.js        # Centralized 404 and global error handlers
│   │
│   ├── routes/
│   │   ├── email.routes.js            # Routes for /api/contact, /api/send, /api/custom
│   │   ├── health.routes.js           # Routes for /api/health
│   │   └── index.js                   # Master router aggregator
│   │
│   └── app.js                         # Express application setup & middleware pipeline
│
├── server.js                          # HTTP server entry point with graceful shutdown
├── test-send.js                       # CLI test script to verify SMTP credentials
├── local-smtp-server.js               # Optional offline mock SMTP receiver (port 2525)
├── package.json                       # Dependencies, scripts & metadata
├── .env.example                       # Environment template
├── .env                               # Local secrets (git-ignored)
├── .gitignore                         # Protects node_modules/ & .env
└── README.md                          # Documentation & scaling guide
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd smtp-server
npm install
```

### 2. Configure Environment (`.env`)
Create or edit your `.env` file:
```env
PORT=5000
NODE_ENV=development

# Gmail SMTP Settings:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true

# Your Gmail & App Password (16 characters):
SMTP_USER=mohamadhuashik@gmail.com
SMTP_PASS=your_16_char_google_app_password

# Where incoming portfolio contact emails are delivered:
RECEIVER_EMAIL=mohamadhuashik@gmail.com
SENDER_NAME="Mohamadhu Ashik Portfolio"

# Allowed CORS origins (* for development):
CLIENT_ORIGIN=http://localhost:3000,*
```

---

## 🔑 How to Get a Gmail App Password

1. Open your [Google Account Security](https://myaccount.google.com/security).
2. Ensure **2-Step Verification** is turned **ON**.
3. In the top search bar, type **"App passwords"** (or go to `https://myaccount.google.com/apppasswords`).
4. Enter an App Name (e.g., `Portfolio Mailer`) and click **Create**.
5. Copy the generated **16-character code** into your `.env` as `SMTP_PASS`.

---

## ⚡ Running the Server

### Development Mode (with hot-reloading)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Test SMTP Connection via CLI
```bash
npm run test:email
```

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api` | Service status and API overview |
| `GET` | `/api/health` | Verifies live SMTP transporter connection |
| `POST` | `/api/contact` | Validates and dispatches contact form submission |
| `POST` | `/api/send` | Alias for `/api/contact` |
| `POST` | `/api/custom` | Sends arbitrary custom email (`to`, `subject`, `text`/`html`) |

### Example Request (`POST /api/contact`)
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "subject": "Full Stack Developer Opportunity",
    "message": "Hi Ashik, I would love to connect regarding an opening on our engineering team."
  }'
```

### Example Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "messageId": "<c28d19fa-948f-4318-8422-901b0f19a0a1@gmail.com>"
}
```

---

## 📈 Scalability Roadmap

Because the project is separated into clean layers:

1. **Adding Database Logging (MongoDB / PostgreSQL)**:
   - Create a Mongoose schema or Prisma model in `src/models/`.
   - Call `model.create()` inside `src/services/email.service.js` before/after `transporter.sendMail()`.
2. **Adding Message Queues (BullMQ / Redis)**:
   - Introduce a worker queue in `src/services/` to process thousands of outgoing emails asynchronously in the background.
3. **Adding Rate Limiting**:
   - Add `express-rate-limit` as a middleware in `src/middlewares/rateLimit.middleware.js` to protect against spam bots.
4. **Multiple Email Providers**:
   - Easily swap or failover between Gmail, AWS SES, SendGrid, or Resend within `src/config/mailer.config.js` without touching controllers or routes.
