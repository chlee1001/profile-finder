import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  imgUrl1: {
    type: String,
    required: "Image 1 URL is required",
  },
  imgUrl2: {
    type: String,
    required: "Image 2 URL is required",
  },
  imgUrl3: {
    type: String,
    required: "Image 3 URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  keywords: [
    {
      type: String,
    },
  ],
});

const model = mongoose.model("Resume", ResumeSchema);
export default model;
