"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  return console.log("✅ DB 연결");
};

var handleError = function handleError(error) {
  return console.log("\u274C DB \uC5F0\uACB0 \uC624\uB958:".concat(error));
};

db.once("open", handleOpen);
db.on("error", handleError);