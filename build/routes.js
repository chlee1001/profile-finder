"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; // Users

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; // Recruits

var RECRUITS = "/recruits";
var UPLOAD_RECRUIT = "/upload-recruit";
var RECRUIT_DETAIL = "/:id";
var EDIT_RECRUIT = "/:id/edit";
var DELETE_RECRUIT = "/:id/delete";
var APPLY = "/:id/apply";
var LIST = "/:id/list"; // Resumes

var RESUMES = "/resumes";
var UPLOAD_RESUME = "/upload-resume";
var RESUME_DETAIL = "/:id";
var EDIT_RESUME = "/:id/edit";
var DELETE_RESUME = "/:id/delete"; // Github

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback"; // Naver

var NAVER = "/auth/naver";
var NAVER_CALLBACK = "/auth/naver/callback"; // API

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  recruits: RECRUITS,
  uploadRecruit: UPLOAD_RECRUIT,
  recruitDetail: function recruitDetail(id) {
    if (id) {
      return "/recruits/".concat(id);
    } else {
      return RECRUIT_DETAIL;
    }
  },
  editRecruit: function editRecruit(id) {
    if (id) {
      return "/recruits/".concat(id, "/edit");
    } else {
      return EDIT_RECRUIT;
    }
  },
  deleteRecruit: function deleteRecruit(id) {
    if (id) {
      return "/recruits/".concat(id, "/delete");
    } else {
      return DELETE_RECRUIT;
    }
  },
  apply: function apply(id) {
    if (id) {
      return "/recruits/".concat(id, "/apply");
    } else {
      return APPLY;
    }
  },
  list: function list(id) {
    if (id) {
      return "/recruits/".concat(id, "/list");
    } else {
      return LIST;
    }
  },
  resumes: RESUMES,
  uploadResume: UPLOAD_RESUME,
  resumeDetail: function resumeDetail(id) {
    if (id) {
      return "/resumes/".concat(id);
    } else {
      return RESUME_DETAIL;
    }
  },
  editResume: function editResume(id) {
    if (id) {
      return "/resumes/".concat(id, "/edit");
    } else {
      return EDIT_RESUME;
    }
  },
  deleteResume: function deleteResume(id) {
    if (id) {
      return "/resumes/".concat(id, "/delete");
    } else {
      return DELETE_RESUME;
    }
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW
};
var _default = routes;
exports["default"] = _default;