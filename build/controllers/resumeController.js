"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteResume = exports.postEditResume = exports.getEditResume = exports.resumeDetail = exports.postUploadResume = exports.getUploadResume = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

var _Recruit = _interopRequireDefault(require("../models/Recruit"));

var _Resume = _interopRequireDefault(require("../models/Resume"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Upload Resume
var getUploadResume = function getUploadResume(req, res) {
  return res.render("uploadResume", {
    pageTitle: "지원서 작성"
  });
};

exports.getUploadResume = getUploadResume;

var postUploadResume = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, birth, description, userGender, keywordA, keywordB, keywordC, keywordD, keywordE, _req$files, profileImg1, profileImg2, profileImg3, newResume;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, birth = _req$body.birth, description = _req$body.description, userGender = _req$body.userGender, keywordA = _req$body.keywordA, keywordB = _req$body.keywordB, keywordC = _req$body.keywordC, keywordD = _req$body.keywordD, keywordE = _req$body.keywordE, _req$files = req.files, profileImg1 = _req$files.profileImg1, profileImg2 = _req$files.profileImg2, profileImg3 = _req$files.profileImg3;
            _context.next = 3;
            return _Resume["default"].create({
              imgUrlOne: profileImg1[0].location,
              imgUrlTwo: profileImg2[0].location,
              imgUrlThree: profileImg3[0].location,
              name: name,
              birth: parseInt(birth),
              description: description,
              gender: userGender,
              keywordA: parseInt(keywordA),
              keywordB: parseInt(keywordB),
              keywordC: parseInt(keywordC),
              keywordD: parseInt(keywordD),
              keywordE: parseInt(keywordE),
              creator: req.user.id
            });

          case 3:
            newResume = _context.sent;
            console.log(newResume);
            req.user.resumes.push(newResume.id);
            req.user.save();
            res.redirect(_routes["default"].resumeDetail(newResume.id));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postUploadResume(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Resume Detail


exports.postUploadResume = postUploadResume;

var resumeDetail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, resume;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Resume["default"].findById(id).populate('creator');

          case 4:
            resume = _context2.sent;
            console.log(resume);
            res.render("resumeDetail", {
              pageTitle: "".concat(resume.name),
              resume: resume
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function resumeDetail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // Edit Resume


exports.resumeDetail = resumeDetail;

var getEditResume = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, resume;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Resume["default"].findById(id);

          case 4:
            resume = _context3.sent;
            res.render("editResume", {
              pageTitle: "".concat(resume.name, " \uD3B8\uC9D1"),
              resume: resume
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function getEditResume(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getEditResume = getEditResume;

var postEditResume = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _req$body2, name, birth, description;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, name = _req$body2.name, birth = _req$body2.birth, description = _req$body2.description;
            _context4.prev = 1;
            _context4.next = 4;
            return _Resume["default"].findOneAndUpdate({
              _id: id
            }, {
              name: name,
              birth: parseInt(birth),
              description: description
            });

          case 4:
            res.redirect(_routes["default"].resumeDetail(id));
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function postEditResume(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEditResume = postEditResume;

var deleteResume = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, resume, recruits, recruit;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Resume["default"].findById(id).populate('creator');

          case 4:
            resume = _context5.sent;

            if (!(resume.creator.id !== req.user.id)) {
              _context5.next = 9;
              break;
            }

            throw Error();

          case 9:
            req.user.resumes.splice(req.user.resumes.indexOf(id), 1);
            req.user.save();
            _context5.next = 13;
            return _Recruit["default"].find({});

          case 13:
            recruits = _context5.sent;

            for (recruit in recruits) {
              if (recruit.resumeList && recruit.resumeList.includes(id)) {
                recruit.resumeList.splice(recruit.resumeList.indexOf(id), 1);
                recruit.save();
              }
            }

            _context5.next = 17;
            return _Resume["default"].findOneAndRemove({
              _id: id
            });

          case 17:
            _context5.next = 22;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);

          case 22:
            res.redirect(_routes["default"].home);

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 19]]);
  }));

  return function deleteResume(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteResume = deleteResume;