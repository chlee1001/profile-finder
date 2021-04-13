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
    console.log(recruits);
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
    body: { title, part, deadline, description, userGender },
  } = req;
  console.log(deadline)
  const newRecruit = await Recruit.create({
    title,
    part,
    deadline,
    description,
    gender: userGender,
    creator: req.user.id,
  });
  console.log(newRecruit);
  req.user.recruitList.push(newRecruit.id);
  req.user.save();
  req.flash('success', '모집글을 업로드했습니다');
  res.redirect(routes.recruitDetail(newRecruit.id));
};

// Recruit Detail

export const recruitDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const recruit = await Recruit.findById(id).populate("creator");
    recruit.views += 1;
    recruit.save();
    console.log(recruit)
    res.render("recruitDetail", { pageTitle: recruit.title, recruit });
  } catch (error) {
    req.flash('error', '모집글을 찾을 수 없습니다');
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
    if (String(recruit.creator) !== req.user.id) {
      req.flash('error', '모집글을 수정할 수 없습니다');
      throw Error();
    } else {
      res.render("editRecruit", {
        pageTitle: `글 수정 (${recruit.title})`,
        recruit,
      });
    }
  } catch (error) {
    req.flash('error', '모집글을 찾을 수 없습니다');
    res.redirect(routes.home);
  }
};

export const postEditRecruit = async (req, res) => {
  const {
    params: { id },
    body: { title, part, deadline, description, userGender },
  } = req;
  try {
    await Recruit.findOneAndUpdate({ _id: id }, { title, part, deadline, description, gender: userGender });
    req.flash('success', '모집글을 수정했습니다');
    res.redirect(routes.recruitDetail(id));
  } catch (error) {
    req.flash('error', '모집글을 수정할 수 없습니다');
    res.redirect(routes.home);
  }
};

// Apply

export const getApply = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(req.user.id).populate("resumes");
  console.log(user)
  res.render("apply", { pageTitle: "지원하기", user, id });
};

export const postApply = async (req, res) => {
  const {
    params: { id },
    body: { myResumes },
  } = req;
  try {
    const recruit = await Recruit.findById(id);
    const resume = await Recruit.findById(myResumes);
    if (recruit.gender == resume.gender){
      if (!recruit.resumeList.includes(myResumes)) {
        recruit.resumeList.push(myResumes);
        recruit.save();
        console.log(recruit);

        const user = await User.findById(req.user.id);
        if (!user.applyList.includes(myResumes)) {
          user.applyList.push(id);
          user.save();
        }
      } else {
        req.flash('error', '이미 지원한 모집글입니다');
      }
    } else {
      req.flash('error', '지원할 수 없는 성별입니다');
    }
  } catch (error) {
    req.flash('error', '모집글을 찾을 수 없습니다');
    console.log(error);
  }
  res.redirect(routes.recruitDetail(id));
};

export const list = async (req, res) => {
  const {
    params: { id },
    query: { k },
  } = req;
  try {
    const recruit = await Recruit.findById(id).populate('resumeList');
    let resumeList = recruit.resumeList;
    let keywords = []
    if (k != undefined){
      keywords = Array.isArray(k)? k : [k];
      if (keywords.includes('A')){
        resumeList = resumeList.filter(resume => resume.keywordA >= 15);
      }
      if (keywords.includes('B')){
        resumeList = resumeList.filter(resume => resume.keywordB >= 15);
      }
      if (keywords.includes('C')){
        resumeList = resumeList.filter(resume => resume.keywordC >= 15);
      }
      if (keywords.includes('D')){
        resumeList = resumeList.filter(resume => resume.keywordD >= 15);
      }
      if (keywords.includes('E')){
        resumeList = resumeList.filter(resume => resume.keywordE >= 15);
      }
      console.log(resumeList)
    }
    res.render("list", { pageTitle: "지원자 보기", recruit, resumeList, keywords });
  } catch (error) {
    req.flash('error', '모집글을 찾을 수 없습니다');
    console.log(error);
    res.redirect(routes.recruitDetail(id));
  }
};

// Delete Recruit

export const deleteRecruit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const recruit = await Recruit.findById(id).populate('creator');
    if (recruit.creator.id !== req.user.id) {
      req.flash('error', '모집글 작성자가 아닙니다');
      throw Error();
    } else {
      req.user.recruitList.splice(req.user.recruitList.indexOf(id), 1);
      req.user.save();
      const users = await User.find({});
      console.log(users)
      for (const user in users){
        if (user.applyList && user.applyList.includes(id)) {
          user.applyList.splice(user.applyList.indexOf(id), 1);
          user.save();
        }
      }
      await Recruit.findOneAndRemove({ _id: id });
      req.flash('success', '모집글을 삭제했습니다');
    }
  } catch (error) {
    req.flash('error', '모집글을 찾을 수 없습니다');
    console.log(error);
  }
  res.redirect(routes.home);
};

