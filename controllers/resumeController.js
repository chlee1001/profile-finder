import routes from "../routes";
import Resume from "../models/Resume";
import User from "../models/User";

// Upload Resume

export const getUploadResume = (req, res) =>
  res.render("uploadResume", { pageTitle: "지원서 작성" });

export const postUploadResume = async (req, res) => {
  const {
    body: { title, description },
    profileImg1: { path1 },
    profileImg2: { path2 },
    profileImg3: { path3 },
  } = req;
  const newResume = await Resume.create({
    title,
    description,
    imgUrl1: path1,
    imgUrl2: path2,
    imgUrl3: path3,
  });
  const user = await User.findById(req.user.id);
  user.resumes.push(newResume.id);
  user.save();
  res.redirect(routes.resumeDetail(newResume.id));
};

// Resume Detail

export const resumeDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const resume = await Resume.findById(id);
    res.render("resumeDetail", { pageTitle: "지원서 상세보기", resume });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Edit Resume

export const getEditResume = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const resume = await Resume.findById(id);
    res.render("editResume", { pageTitle: `${resume.title} 편집`, resume });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditResume = async (req, res) => {
  const {
    body: { title, description },
    profileImg1: { path1 },
    profileImg2: { path2 },
    profileImg3: { path3 },
  } = req;
  try {
    await Resume.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        imgUrl1: path1,
        imgUrl2: path2,
        imgUrl3: path3,
      }
    );
    res.redirect(routes.resumeDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteResume = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Resume.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
