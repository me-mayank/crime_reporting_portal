import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Providing name is neccessray"]
    },
    email:{
        type: String,
        required: [true, "Email is neccessary to update you with the case"]
    },
    password:{
        type: String,
        required: [true, "Password is neccessary"],
        minlength: 6
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps: true}
)

export const User = mongoose.model("User", userSchema);