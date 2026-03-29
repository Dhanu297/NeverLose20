// services/emailService.js
// -----------------------------------------------------------------------------
// EmailService
// -----------------------------------------------------------------------------
// Responsible for sending emails (via Nodemailer) and logging all attempts
// into Firestore's "emailOutbox" collection.
//
// Features:
// ✔ Gmail SMTP transport
// ✔ Retry logic with exponential backoff (1s → 2s → 4s ...)
// ✔ Logs every attempt: SENT, FAILED_ATTEMPT_X, FAILED
// ✔ Firestore-based outbox for dev/staging/production visibility
// ✔ Fire-and-forget logging so email failures never block API responses
//
// This service is intentionally isolated so that PublicService and other
// modules never need to worry about email transport or logging details.
// -----------------------------------------------------------------------------

const nodemailer = require("nodemailer");
const { db } = require("../config/firebaseConfig");

const OUTBOX_COLLECTION = "emailOutbox";

// -----------------------------------------------------------------------------
// Configure Nodemailer SMTP Transport (Gmail)
// -----------------------------------------------------------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASS  // App password (NOT your Gmail login password)
  }
});

// -----------------------------------------------------------------------------
// Utility: Delay for N milliseconds (used for exponential backoff)
// -----------------------------------------------------------------------------
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// -----------------------------------------------------------------------------
// Log an email attempt to Firestore
// -----------------------------------------------------------------------------
async function logOutbox({ to, subject, body, status, error }) {
  const ref = db.collection(OUTBOX_COLLECTION).doc();

  const entry = {
    id: ref.id,
    to,
    subject,
    body,
    status,          // SENT, FAILED_ATTEMPT_X, FAILED
    error: error || null,
    createdAt: new Date().toISOString(),
    env: process.env.NODE_ENV || "development"
  };

  // Fire-and-forget (we never block API flow for logging)
  ref.set(entry).catch((err) => {
    console.error("Failed to write email outbox entry:", err);
  });
}

// -----------------------------------------------------------------------------
// Send Found Report Email
// -----------------------------------------------------------------------------
// Attempts to send an email with retry logic.
// Logs every attempt to Firestore.
//
// Params:
//   { to, subject, body }
//
// Behavior:
//   - Try sending email up to MAX_EMAIL_ATTEMPT times
//   - On each failure, log FAILED_ATTEMPT_X
//   - On final failure, log FAILED
//   - On success, log SENT
// -----------------------------------------------------------------------------
async function sendFoundReportEmail({ to, subject, body }) {
  const maxRetries = parseInt(process.env.MAX_EMAIL_ATTEMPT || "3", 10);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Attempt to send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body
      });

      // Log success
      await logOutbox({
        to,
        subject,
        body,
        status: "SENT"
      });

      console.log(`EMAIL SENT → ${to} (attempt ${attempt})`);
      return;

    } catch (err) {
      console.error(`Email attempt ${attempt} failed:`, err.message);

      // Log failed attempt
      await logOutbox({
        to,
        subject,
        body,
        status: `FAILED_ATTEMPT_${attempt}`,
        error: err.message
      });

      // If last attempt → mark permanently failed
      if (attempt === maxRetries) {
        await logOutbox({
          to,
          subject,
          body,
          status: "FAILED",
          error: err.message
        });

        console.error("Email permanently failed after retries.");
        return;
      }

      // Exponential backoff: 1s → 2s → 4s → ...
      const wait = 1000 * Math.pow(2, attempt - 1);
      await delay(wait);
    }
  }
}

// -----------------------------------------------------------------------------
// Export Public API
// -----------------------------------------------------------------------------
module.exports = {
  sendFoundReportEmail
};