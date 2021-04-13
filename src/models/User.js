import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  naverId: Number,
  githubId: Number,
  avatarUrl: String,
  resumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
  recruitList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruit",
    },
  ],
  applyList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruit",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
