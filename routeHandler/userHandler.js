const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../Schemas/userSchema");

// Model
const User = new mongoose.model("User", userSchema);

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup was successful!",
    });
  } catch {
    res.status(500).json({
      message: "Signup failed!",
    });
  }
});

module.exports = router;
