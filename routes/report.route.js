import express from "express";
import {Report} from "../models/report.model.js";

const router = express.Router();

router.post("/report", async(req,res) => {
     try{
        const newReport = await Report.create(req.body.json);//inserted report data in database
        res.status(201).json(newReport);
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
        const report = Report.find();
        res.json(report);
    }
    catch(error){
        res.json({
            error: error.message
        });
    }
});