"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _resumeController = require("../controllers/resumeController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resumeRouter = _express["default"].Router();

resumeRouter.get(_routes["default"].uploadResume, _middlewares.onlyPrivate, _resumeController.getUploadResume);
resumeRouter.post(_routes["default"].uploadResume, _middlewares.onlyPrivate, _middlewares.uploadImage, _resumeController.postUploadResume);
resumeRouter.get(_routes["default"].editResume(), _middlewares.onlyPrivate, _resumeController.getEditResume);
resumeRouter.post(_routes["default"].editResume(), _middlewares.onlyPrivate, _resumeController.postEditResume);
resumeRouter.get(_routes["default"].resumeDetail(), _resumeController.resumeDetail);
resumeRouter.get(_routes["default"].deleteResume(), _middlewares.onlyPrivate, _resumeController.deleteResume);
var _default = resumeRouter;
exports["default"] = _default;