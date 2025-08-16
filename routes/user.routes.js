import express from "express";
import {User} from "../models/user.model.js";

const router = express.Router();

//create new user
router.post("/users", async(req,res) => {
    try{
        const newUser = await User.create(req.body.json);//inserted data to DataBase
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
});

//get all users 
router.get("/users", async(req,res) => {
    try{
    const user = await User.find();// fetching data from DB
    res.json(user);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

export default router;