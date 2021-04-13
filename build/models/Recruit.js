"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RecruitSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: "Title is required"
  },
  gender: String,
  part: String,
  description: String,
  views: {
    type: Number,
    "default": 0
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  deadline: {
    type: Date,
    "default": Date.now
  },
  resumeList: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Resume"
  }]
});

var model = _mongoose["default"].model("Recruit", RecruitSchema);

var _default = model;
exports["default"] = _default;