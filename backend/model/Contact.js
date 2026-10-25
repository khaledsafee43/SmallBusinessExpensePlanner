
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required."],
    trim: true,
    minlength: [4, "Full name must be at least 4 characters."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email."],
  },
  subject: {
    type: String,
    required: [true, "Subject is required."],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required."],
    trim: true,
    maxlength: [200, "Message cannot exceed 200 characters."],
  },
});

module.exports = mongoose.model("Contact", contactSchema);
