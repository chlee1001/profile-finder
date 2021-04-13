"use strict";

require("./db");

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./models/Recruit");

require("./models/Resume");

require("./models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  return console.log("\u2705 \uC11C\uBC84 \uC5F0\uACB0: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListening);