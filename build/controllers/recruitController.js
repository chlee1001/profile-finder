"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRecruit = exports.list = exports.postApply = exports.getApply = exports.postEditRecruit = exports.getEditRecruit = exports.recruitDetail = exports.postUploadRecruit = exports.getUploadRecruit = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Recruit = _interopRequireDefault(require("../models/Recruit"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Home
var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var recruits;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Recruit["default"].find({}).sort({
              _id: -1
            });

          case 3:
            recruits = _context.sent;
            res.render("home", {
              pageTitle: "홈",
              recruits: recruits
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render("home", {
              pageTitle: "홈",
              recruits: []
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Search


exports.home = home;

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, recruits;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            recruits = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _Recruit["default"].find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 5:
            recruits = _context2.sent;
            console.log(recruits);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 12:
            res.render("search", {
              pageTitle: "검색",
              searchingBy: searchingBy,
              recruits: recruits
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 9]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // Upload Recruit


exports.search = search;

var getUploadRecruit = function getUploadRecruit(req, res) {
  return res.render("uploadRecruit", {
    pageTitle: "모집글 작성"
  });
};

exports.getUploadRecruit = getUploadRecruit;

var postUploadRecruit = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, part, deadline, description, userGender, newRecruit;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, part = _req$body.part, deadline = _req$body.deadline, description = _req$body.description, userGender = _req$body.userGender;
            console.log(deadline);
            _context3.next = 4;
            return _Recruit["default"].create({
              title: title,
              part: part,
              deadline: deadline,
              description: description,
              gender: userGender,
              creator: req.user.id
            });

          case 4:
            newRecruit = _context3.sent;
            console.log(newRecruit);
            req.user.recruitList.push(newRecruit.id);
            req.user.save();
            res.redirect(_routes["default"].recruitDetail(newRecruit.id));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postUploadRecruit(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Recruit Detail


exports.postUploadRecruit = postUploadRecruit;

var recruitDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, recruit;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Recruit["default"].findById(id).populate("creator");

          case 4:
            recruit = _context4.sent;
            recruit.views += 1;
            recruit.save();
            console.log(recruit);
            res.render("recruitDetail", {
              pageTitle: recruit.title,
              recruit: recruit
            });
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes["default"].home);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 11]]);
  }));

  return function recruitDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // Edit Recruit


exports.recruitDetail = recruitDetail;

var getEditRecruit = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, recruit;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Recruit["default"].findById(id);

          case 4:
            recruit = _context5.sent;

            if (!(String(recruit.creator) !== req.user.id)) {
              _context5.next = 9;
              break;
            }

            throw Error();

          case 9:
            res.render("editRecruit", {
              pageTitle: "\uAE00 \uC218\uC815 (".concat(recruit.title, ")"),
              recruit: recruit
            });

          case 10:
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function getEditRecruit(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getEditRecruit = getEditRecruit;

var postEditRecruit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, title, part, deadline, description, userGender;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, part = _req$body2.part, deadline = _req$body2.deadline, description = _req$body2.description, userGender = _req$body2.userGender;
            _context6.prev = 1;
            _context6.next = 4;
            return _Recruit["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              part: part,
              deadline: deadline,
              description: description,
              gender: userGender
            });

          case 4:
            res.redirect(_routes["default"].recruitDetail(id));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].home);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditRecruit(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); // Apply


exports.postEditRecruit = postEditRecruit;

var getApply = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.next = 3;
            return _User["default"].findById(req.user.id).populate("resumes");

          case 3:
            user = _context7.sent;
            console.log(user);
            res.render("apply", {
              pageTitle: "지원하기",
              user: user,
              id: id
            });

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getApply(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getApply = getApply;

var postApply = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, myResumes, recruit, user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id, myResumes = req.body.myResumes;
            _context8.prev = 1;
            _context8.next = 4;
            return _Recruit["default"].findById(id);

          case 4:
            recruit = _context8.sent;

            if (recruit.resumeList.includes(myResumes)) {
              _context8.next = 15;
              break;
            }

            recruit.resumeList.push(myResumes);
            recruit.save();
            console.log(recruit);
            _context8.next = 11;
            return _User["default"].findById(req.user.id);

          case 11:
            user = _context8.sent;

            if (!user.applyList.includes(myResumes)) {
              user.applyList.push(id);
              user.save();
            }

            _context8.next = 16;
            break;

          case 15:
            console.log("이미 지원한 모집글입니다.");

          case 16:
            _context8.next = 21;
            break;

          case 18:
            _context8.prev = 18;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);

          case 21:
            res.redirect(_routes["default"].recruitDetail(id));

          case 22:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 18]]);
  }));

  return function postApply(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postApply = postApply;

var list = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var id, k, recruit, resumeList, keywords;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, k = req.query.k;
            _context9.prev = 1;
            _context9.next = 4;
            return _Recruit["default"].findById(id).populate('resumeList');

          case 4:
            recruit = _context9.sent;
            resumeList = recruit.resumeList;
            keywords = [];

            if (k != undefined) {
              keywords = Array.isArray(k) ? k : [k];

              if (keywords.includes('A')) {
                resumeList = resumeList.filter(function (resume) {
                  return resume.keywordA >= 15;
                });
              }

              if (keywords.includes('B')) {
                resumeList = resumeList.filter(function (resume) {
                  return resume.keywordB >= 15;
                });
              }

              if (keywords.includes('C')) {
                resumeList = resumeList.filter(function (resume) {
                  return resume.keywordC >= 15;
                });
              }

              if (keywords.includes('D')) {
                resumeList = resumeList.filter(function (resume) {
                  return resume.keywordD >= 15;
                });
              }

              if (keywords.includes('E')) {
                resumeList = resumeList.filter(function (resume) {
                  return resume.keywordE >= 15;
                });
              }

              console.log(resumeList);
            }

            res.render("list", {
              pageTitle: "지원자 보기",
              recruit: recruit,
              resumeList: resumeList,
              keywords: keywords
            });
            _context9.next = 15;
            break;

          case 11:
            _context9.prev = 11;
            _context9.t0 = _context9["catch"](1);
            console.log(_context9.t0);
            res.redirect(_routes["default"].recruitDetail(id));

          case 15:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 11]]);
  }));

  return function list(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}(); // Delete Recruit


exports.list = list;

var deleteRecruit = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var id, recruit, users, user;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id;
            _context10.prev = 1;
            _context10.next = 4;
            return _Recruit["default"].findById(id).populate('creator');

          case 4:
            recruit = _context10.sent;

            if (!(recruit.creator.id !== req.user.id)) {
              _context10.next = 9;
              break;
            }

            throw Error();

          case 9:
            req.user.recruitList.splice(req.user.recruitList.indexOf(id), 1);
            req.user.save();
            _context10.next = 13;
            return _User["default"].find({});

          case 13:
            users = _context10.sent;
            console.log(users);

            for (user in users) {
              if (user.applyList && user.applyList.includes(id)) {
                user.applyList.splice(user.applyList.indexOf(id), 1);
                user.save();
              }
            }

            _context10.next = 18;
            return _Recruit["default"].findOneAndRemove({
              _id: id
            });

          case 18:
            _context10.next = 23;
            break;

          case 20:
            _context10.prev = 20;
            _context10.t0 = _context10["catch"](1);
            console.log(_context10.t0);

          case 23:
            res.redirect(_routes["default"].home);

          case 24:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 20]]);
  }));

  return function deleteRecruit(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.deleteRecruit = deleteRecruit;