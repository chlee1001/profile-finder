import routes from "../routes";
import Recruit from "../models/Recruit";
import User from "../models/User";

// Home

export const home = async (req, res) => {
  try {
    const recruits = await Recruit.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "홈", recruits });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "홈", recruits: [] });
  }
};

// Search

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let recruits = [];
  try {
    recruits = await Recruit.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    consolg.log(recruits);
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "검색", searchingBy, recruits });
};

// Upload Recruit

export const getUploadRecruit = (req, res) =>
  res.render("uploadRecruit", { pageTitle: "모집글 작성" });

export const postUploadRecruit = async (req, res) => {
  const {
    body: { title, description },
  } = req;
  const newRecruit = await Recruit.create({
    title,
    description,
    creator: req.user.id,
  });
  const user = await User.findById(req.user.id);
  user.recruitList.push(newRecruit.id);
  user.save();
  res.redirect(routes.recruitDetail(newRecruit.id));
};

// Recruit Detail

export const recruitDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const recruit = await Recruit.findById(id).populate("creator");
    res.render("recruitDetail", { pageTitle: recruit.title, recruit });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Edit Recruit

export const getEditRecruit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const recruit = await Recruit.findById(id);
    if (recruit.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editRecruit", {
        pageTitle: `글 수정 (${recruit.title})`,
        recruit,
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditRecruit = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Recruit.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.recruitDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Apply

export const getApply = async (req, res) => {
  const me = await User.findById(req.user).populate("resumes");
  res.render("apply", { pageTitle: "지원하기", user: me, resumes: me.resumes });
};

export const postApply = async (req, res) => {
  const {
    params: { id },
    body: { myResumes },
  } = req;
  try {
    const recruit = await Recruit.findById(id);
    if (!recruit.resumeList.includes(myResumes)) {
      recruit.resumeList.push(myResumes);
      console.log(recruit.resumeList);
      recruit.save();

      const user = await User.findById(req.user.id);
      if (!user.applyList.includes(myResumes)) {
        user.applyList.push(myResumes.id);
        user.save();
      }
    } else {
      console.log("이미 지원한 모집글입니다.");
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.recruitDetail(id));
};

export const list = (req, res) =>
  res.render("list", { pageTitle: "지원자 보기" });

// Delete Recruit

export const deleteRecruit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const recruit = await Recruit.findById(id);
    if (recruit.creator !== req.user.id) {
      throw Error();
    } else {
      await Recruit.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const recruit = await Recruit.findById(id);
    recruit.views += 1;
    recruit.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
