import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import User from "../models/user.js";
import { mailer } from "../config/mailer.js";

const router = Router();
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { message: "Too many contact attempts. Try again in 15 minutes." },
});

router.post("/:username", contactLimiter, async (req, res, next) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (
    !name || name.length > 100 ||
    email.length > 254 || !/^[^\s@,<>]+@[^\s@,<>]+\.[^\s@,<>]+$/.test(email) ||
    !message || message.length > 3000
  ) {
    return res.status(400).json({ message: "Enter a valid name, email, and message." });
  }

  try {
    const owner = await User.findOne({
      username: req.params.username.toLowerCase(),
    }).select("profile.email");

    if (!owner?.profile?.email) {
      return res.status(404).json({ message: "Contact is unavailable for this portfolio." });
    }

    await mailer.sendMail({
      from: process.env.SMTP_USER,
      to: owner.profile.email,
      replyTo: email,
      subject: "New Codefolio contact message",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return res.json({ message: "Message sent." });
  } catch (error) {
    return next(error);
  }
});

export default router;