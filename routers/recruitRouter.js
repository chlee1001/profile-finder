import express from "express";
import routes from "../routes";
import {
  getUploadRecruit,
  postUploadRecruit,
  recruitDetail,
  getEditRecruit,
  postEditRecruit,
  deleteRecruit,
  getApply,
  postApply,
  list,
} from "../controllers/recruitController";
import { onlyPrivate } from "../middlewares";

const recruitRouter = express.Router();

recruitRouter.get(routes.uploadRecruit, onlyPrivate, getUploadRecruit);
recruitRouter.post(routes.uploadRecruit, onlyPrivate, postUploadRecruit);

recruitRouter.get(routes.editRecruit(), onlyPrivate, getEditRecruit);
recruitRouter.post(routes.editRecruit(), onlyPrivate, postEditRecruit);

recruitRouter.get(routes.apply(), onlyPrivate, getApply);
recruitRouter.post(routes.apply(), onlyPrivate, postApply);

recruitRouter.get(routes.list(), onlyPrivate, list);
recruitRouter.get(routes.deleteRecruit(), onlyPrivate, deleteRecruit);

recruitRouter.get(routes.recruitDetail(), recruitDetail);

export default recruitRouter;
