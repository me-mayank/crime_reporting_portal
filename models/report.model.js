import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
      title:{
        type: String,
        required: [true, "Provide a title for the crime report"]
      },
      description:{
        type: String,
        required: [true, "Provide the description of the crime"]
      },
      category:{
        type: String,
        enum: ["theft", "fraud", "assualt", "vandalism", "others"],
        required: true
      },
      location:{
        city: {type: String, required: true},
        state: {type: String, required: true},
        cordinates:{
            latitude: {type: Number, required: true},
            longitude: {type: Number, required: true}
        }
      },
      status:{
        type: String,
        enum: ["open", "pending", "closed"],
        default: "open"
      },
      reporter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      dateReported:{
        type: Date,
        default: Date.now
      }
},{timestamps: true}
);

export const Report = mongoose.model("Report", reportSchema);