"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyPrivate = exports.onlyPublic = exports.localsMiddleware = exports.redirectUrl = exports.formatDate = exports.uploadAvatar = exports.uploadImage = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});
var multerImage = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "profile-finder/image"
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "profile-finder/avatar"
  })
});
var uploadImage = multerImage.fields([{
  name: 'profileImg1'
}, {
  name: 'profileImg2'
}, {
  name: 'profileImg3'
}]);
exports.uploadImage = uploadImage;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;

var formatDate = function formatDate(date) {
  var d = new Date(date);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join(". ");
};

exports.formatDate = formatDate;

var redirectUrl = function redirectUrl(string) {
  if (string !== undefined && string.charAt(0) === "u") {
    return "/".concat(string);
  }

  return string;
};

exports.redirectUrl = redirectUrl;

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "프로필 파인더";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  res.locals.formatDate = formatDate;
  res.locals.redirect = redirectUrl; // console.log(req.user)

  next();
};

exports.localsMiddleware = localsMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
};

exports.onlyPrivate = onlyPrivate;