"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _recruitController = require("../controllers/recruitController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var recruitRouter = _express["default"].Router();

recruitRouter.get(_routes["default"].uploadRecruit, _middlewares.onlyPrivate, _recruitController.getUploadRecruit);
recruitRouter.post(_routes["default"].uploadRecruit, _middlewares.onlyPrivate, _recruitController.postUploadRecruit);
recruitRouter.get(_routes["default"].editRecruit(), _middlewares.onlyPrivate, _recruitController.getEditRecruit);
recruitRouter.post(_routes["default"].editRecruit(), _middlewares.onlyPrivate, _recruitController.postEditRecruit);
recruitRouter.get(_routes["default"].apply(), _middlewares.onlyPrivate, _recruitController.getApply);
recruitRouter.post(_routes["default"].apply(), _middlewares.onlyPrivate, _recruitController.postApply);
recruitRouter.get(_routes["default"].list(), _middlewares.onlyPrivate, _recruitController.list);
recruitRouter.get(_routes["default"].deleteRecruit(), _middlewares.onlyPrivate, _recruitController.deleteRecruit);
recruitRouter.get(_routes["default"].recruitDetail(), _recruitController.recruitDetail);
var _default = recruitRouter;
exports["default"] = _default;