import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRoutes from "../routes/user.routes.js";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api", userRoutes);

// Start the server (only once!)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
