import express from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import { compare } from "bcryptjs";

const router = express.Router();

router.post("/login", async(req,res) => {
     try{
        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "INVALID CREDENTIALS !!"
            });
        }

        //checking password 
        const isMatch = await compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "INVALID PASSWORD FOR THIS EMAIL !!"
            });
        }

        // create jwt token
        const token = jwt.sign(
             {id: user._id, role: user.role},
             process.env.JWT_SECRET,
             {expiresIn: "1d"}
        );

        //returning response
        res.status(200).json({
            message: "LOGIN SUCCESSFUL !!",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
     }
     catch(error){
         res.status(500).json({
            message: "Server error !!"
         });
     }
});

export default router;