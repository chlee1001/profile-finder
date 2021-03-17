import express from "express";
import routes from "../routes";
import {
  getUploadResume,
  postUploadResume,
  resumeDetail,
  getEditResume,
  postEditResume,
  deleteResume,
} from "../controllers/resumeController";
import { uploadImage, onlyPrivate } from "../middlewares";

const resumeRouter = express.Router();

resumeRouter.get(routes.uploadResume, onlyPrivate, getUploadResume);
resumeRouter.post(
  routes.uploadResume,
  onlyPrivate,
  uploadImage,
  postUploadResume
);

resumeRouter.get(routes.editResume(), onlyPrivate, getEditResume);
resumeRouter.post(routes.editResume(), onlyPrivate, postEditResume);

resumeRouter.get(routes.resumeDetail(), resumeDetail);
resumeRouter.get(routes.deleteResume(), onlyPrivate, deleteResume);

export default resumeRouter;
