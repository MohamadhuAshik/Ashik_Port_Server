const { Router } = require("express");
const { sendContact, sendCustom } = require("../controllers/email.controller");
const { validateContactPayload } = require("../middlewares/validate.middleware");

const router = Router();


router.post("/contact", validateContactPayload, sendContact);


router.post("/send", validateContactPayload, sendContact);


router.post("/custom", sendCustom);

module.exports = router;
