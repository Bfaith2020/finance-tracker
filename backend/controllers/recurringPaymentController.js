const nodemailer = require("nodemailer");
const RecurringPayment = require("../models/RecurringPayment");

// Get all recurring payments for a user
exports.getRecurringPayments = async (req, res) => {
  try {
    const payments = await RecurringPayment.find({ user: req.user._id }).sort({ dueDate: 1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recurring payments." });
  }
};

// Add a new recurring payment
exports.addRecurringPayment = async (req, res) => {
  try {
    const { name, amount, dueDate, providerEmail } = req.body;
    if (!name || !amount || !dueDate) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const payment = new RecurringPayment({
      user: req.user._id,
      name,
      amount,
      dueDate,
      providerEmail,
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add recurring payment." });
  }
};

// Delete a recurring payment
exports.deleteRecurringPayment = async (req, res) => {
  try {
    const payment = await RecurringPayment.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!payment) {
      return res.status(404).json({ message: "Recurring payment not found." });
    }
    res.json({ message: "Recurring payment deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete recurring payment." });
  }
};

// Renegotiate recurring payment (send email)
exports.renegotiateRecurringPayment = async (req, res) => {
  try {
    const { paymentId, newDate, message } = req.body;
    if (!paymentId || !newDate || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const payment = await RecurringPayment.findOne({ _id: paymentId, user: req.user._id });
    if (!payment) {
      return res.status(404).json({ message: "Recurring payment not found." });
    }
    // Send email to the providerEmail if available, else fallback
    const toEmail = payment.providerEmail || process.env.RENEGOTIATE_TO || "provider@example.com";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: `Renegotiation Request for ${payment.name}`,
      text: `User requests to renegotiate the payment for ${payment.name} to new date: ${newDate}.\n\nMessage: ${message}`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: "Renegotiation request sent." });
  } catch (err) {
    console.error("Renegotiation error:", err);
    res.status(500).json({ message: "Failed to send renegotiation request.", error: err.message });
  }
};
