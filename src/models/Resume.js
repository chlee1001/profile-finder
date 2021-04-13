import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  imgUrlOne: String,
  imgUrlTwo: String,
  imgUrlThree: String,
  gender: String,
  birth: Number,
  name: {
    type: String,
    required: "Name is required",
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
  keywordA: {
    type: Number,
    default: 0,
  },
  keywordB: {
    type: Number,
    default: 0,
  },
  keywordC: {
    type: Number,
    default: 0,
  },
  keywordD: {
    type: Number,
    default: 0,
  },
  keywordE: {
    type: Number,
    default: 0,
  },
});

const model = mongoose.model("Resume", ResumeSchema);
export default model;
