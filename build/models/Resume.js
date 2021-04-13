"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ResumeSchema = new _mongoose["default"].Schema({
  imgUrlOne: String,
  imgUrlTwo: String,
  imgUrlThree: String,
  gender: String,
  birth: Number,
  name: {
    type: String,
    required: "Name is required"
  },
  description: String,
  createdAt: {
    type: Date,
    "default": Date.now
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  keywordA: {
    type: Number,
    "default": 0
  },
  keywordB: {
    type: Number,
    "default": 0
  },
  keywordC: {
    type: Number,
    "default": 0
  },
  keywordD: {
    type: Number,
    "default": 0
  },
  keywordE: {
    type: Number,
    "default": 0
  }
});

var model = _mongoose["default"].model("Resume", ResumeSchema);

var _default = model;
exports["default"] = _default;