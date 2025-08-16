import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRoutes from "../routes/user.routes.js";
import reportRoutes from "../routes/report.route.js";
import cors from "cors";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();
app.use(cors({ origin: "*" })); // "*" allows all origins

// Middleware to parse JSON
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api", userRoutes);
app.use("/api", reportRoutes);


app.get("/", async(req,res) => {
    res.send("API IS WORKING !!!");
});

const PORT = process.env.PORT || 8000;

// Start the server (only once!)
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
