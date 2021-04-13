import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// Join

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "회원가입" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash('error', '비밀번호가 서로 일치하지 않습니다');
    res.status(400);
    res.render("join", { pageTitle: "회원가입" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To Do: Log user in
    res.redirect(routes.home);
  }
};

// Login

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "로그인" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "환영합니다",
  failureFlash: "로그인할 수 없습니다"
});

// Github

export const githubLogin = passport.authenticate("github", {
  successFlash: "환영합니다",
  failureFlash: "로그인할 수 없습니다"
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email, login },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email: `${login}@users.noreply.github.com`,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// Naver

export const naverLogin = passport.authenticate("naver", {
  successFlash: "환영합니다",
  failureFlash: "로그인할 수 없습니다"
});

export const naverLoginCallback = async (_, __, profile, done) => {
  const {
    _json: { id, nickname: name, email },
  } = profile;
  try {
    const user = await User.findOne({ id });
    if (user) {
      user.naverId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      naverId: id,
      name,
      email,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};

// logout

export const logout = (req, res) => {
  req.flash("info", "로그아웃 되었습니다")
  req.logout();
  res.redirect(routes.home);
};

// Me
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("resumes")
    .populate("recruitList")
    .populate("applyList");
  console.log(user);
  res.render("userDetail", { pageTitle: "User Detail", user, userDetail: true });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id)
      .populate("resumes")
      .populate("recruitList")
      .populate("applyList");
    console.log(user);
    let userDetail = false;
    if (req.user.id == user.id){
      userDetail = true;
    }
    res.render("userDetail", { pageTitle: "User Detail", user, userDetail });
  } catch (error) {
    req.flash('error', '사용자를 찾을 수 없습니다');
    res.redirect(routes.home);
  }
};

// Edit Profile

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "내 정보 수정" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash('success', '내 정보가 업데이트 되었습니다');
    res.redirect(routes.me);
  } catch (error) {
    req.flash('error', '내 정보를 업데이트할 수 없습니다');
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "비밀번호 변경" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash('error', '비밀번호가 일치하지 않습니다');
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    req.flash('error', '비밀번호를 변경할 수 없습니다');
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
