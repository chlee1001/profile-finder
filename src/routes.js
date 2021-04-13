// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Recruits

const RECRUITS = "/recruits";
const UPLOAD_RECRUIT = "/upload-recruit";
const RECRUIT_DETAIL = "/:id";
const EDIT_RECRUIT = "/:id/edit";
const DELETE_RECRUIT = "/:id/delete";
const APPLY = "/:id/apply";
const LIST = "/:id/list";

// Resumes

const RESUMES = "/resumes";
const UPLOAD_RESUME = "/upload-resume";
const RESUME_DETAIL = "/:id";
const EDIT_RESUME = "/:id/edit";
const DELETE_RESUME = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Naver

const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

// API

const API = "/api";
const REGISTER_VIEW = "/:id/view";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,

  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,

  recruits: RECRUITS,
  uploadRecruit: UPLOAD_RECRUIT,
  recruitDetail: (id) => {
    if (id) {
      return `/recruits/${id}`;
    } else {
      return RECRUIT_DETAIL;
    }
  },
  editRecruit: (id) => {
    if (id) {
      return `/recruits/${id}/edit`;
    } else {
      return EDIT_RECRUIT;
    }
  },
  deleteRecruit: (id) => {
    if (id) {
      return `/recruits/${id}/delete`;
    } else {
      return DELETE_RECRUIT;
    }
  },
  apply: (id) => {
    if (id) {
      return `/recruits/${id}/apply`;
    } else {
      return APPLY;
    }
  },
  list: (id) => {
    if (id) {
      return `/recruits/${id}/list`;
    } else {
      return LIST;
    }
  },

  resumes: RESUMES,
  uploadResume: UPLOAD_RESUME,
  resumeDetail: (id) => {
    if (id) {
      return `/resumes/${id}`;
    } else {
      return RESUME_DETAIL;
    }
  },
  editResume: (id) => {
    if (id) {
      return `/resumes/${id}/edit`;
    } else {
      return EDIT_RESUME;
    }
  },
  deleteResume: (id) => {
    if (id) {
      return `/resumes/${id}/delete`;
    } else {
      return DELETE_RESUME;
    }
  },

  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,

  api: API,
  registerView: REGISTER_VIEW,
};

export default routes;
