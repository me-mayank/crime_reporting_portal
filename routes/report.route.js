import express from "express";
import {Report} from "../models/report.model.js";

const router = express.Router();

router.post("/reports", async(req,res) => {
     try{
        const newReport = await Report.create(req.body);//inserted report data in database
        // Populate reporter info
        const populatedReport = await newReport.populate("reporter", "name email role");
        res.status(201).json(populatedReport);
     }
     catch(error){
        res.status(400).json({
            error: error.message
        });
     }
});

// get all reports 
router.get("/reports", async(req,res) => {
    try{
        // fetching data of reports along with the reporter data
        const report = await Report.find().populate("reporter", "name email role");
        res.json(report);
    }
    catch(error){
        res.json({
            error: error.message
        });
    }
});

export default router;