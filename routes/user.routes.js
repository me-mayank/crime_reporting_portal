import express from "express";
import { User } from "../models/user.model.js";

const router = express.Router();


// Create new user
router.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body); 
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
