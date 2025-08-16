import express from "express";
import {Report} from "../models/report.model.js";
import { PAGE_LIMIT, NUM_PAGES } from "../constants.js";

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


// getting filtered reports according to the search 
router.get("/reports", async(req,res) => {
    try{
        //constructing a query to send to database to fetch the reports who have these 
        const {
            category,
            state,
            city,
            status, 
            search,
            date,
            startDate,
            endDate,
            page = NUM_PAGES,
            limit = PAGE_LIMIT
        } = req.query


        // building a filter object 
        const filter = {};
        if(category) filter.category = category;
        if(state) filter["location.state"] = state;
        if(city) filter["location.city"] = city;
        if(status) filter.status = status;
        
        //if user wants to search with the title or description keywords
        if (search) {
            filter.$text = { $search: search };
        }

        // adding date filter
        if(date){
            const start = new Date(date);
            start.setHours(0,0,0,0);// start of a new date
            const end = new Date(date);
            end.setHours(23,59,59,999);// end of that date
            filter.dateReported = { $gte: start, $lte: end};// gte = date greater than equal to start
            // lte: date less than equal to end
        }
        else if(startDate || endDate){
            filter.dateReported = {};
            if(startDate) filter.dateReported.$gte = new Date(startDate);
            if(endDate) filter.dateReported.$lte = new Date(endDate);
        }

        //now pagination for neat UI and less load on server
        const skip = (parseInt(page)-1)*(parseInt(limit));

        const reports = await Report.find(filter)
          .populate("reporter", "name email")
          .skip(skip)
          .limit(parseInt(limit))
          .sort({dateReported: -1});// latest report on the top 
          
      res.json(reports);
    }
    catch(error){
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;