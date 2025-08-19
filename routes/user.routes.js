import express from "express";
import { User } from "../models/user.model.js";

const router = express.Router();


// Create new user
router.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body); 

    res.status(201).json({
      success: true,
      message: "User created Successfully !!",
      date: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: "Failed to Create User",
      error: error.message 
    });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      name: users.name,
      email: users.email,
      role: users.role
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to Fetch Data of all users",
      error: error.message 
    });
  }
});

export default router;
