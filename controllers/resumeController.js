import routes from "../routes";
import User from "../models/User";
import Recruit from "../models/Recruit";
import Resume from "../models/Resume";

// Upload Resume

export const getUploadResume = (req, res) =>
res.render("uploadResume", { pageTitle: "지원서 작성" });

export const postUploadResume = async (req, res) => {
  const {
    body: { 
      name, 
      birth, 
      description, 
      userGender, 
      keywordA,
      keywordB,
      keywordC,
      keywordD,
      keywordE, 
    },
    files: { profileImg1, profileImg2, profileImg3 }
  } = req;
  const newResume = await Resume.create({
    imgUrlOne: profileImg1[0].location,
    imgUrlTwo: profileImg2[0].location,
    imgUrlThree: profileImg3[0].location,
    name,
    birth: parseInt(birth),
    description,
    gender: userGender,
    keywordA: parseInt(keywordA),
    keywordB: parseInt(keywordB),
    keywordC: parseInt(keywordC),
    keywordD: parseInt(keywordD),
    keywordE: parseInt(keywordE),
    creator: req.user.id,
  });
  console.log(newResume)
  req.user.resumes.push(newResume.id);
  req.user.save();
  res.redirect(routes.resumeDetail(newResume.id));
};

// Resume Detail

export const resumeDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const resume = await Resume.findById(id);
    console.log(resume)
    res.render("resumeDetail", { pageTitle: `${resume.name}`, resume });
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
    res.render("editResume", { pageTitle: `${resume.name} 편집`, resume });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditResume = async (req, res) => {
  const {
    params: { id },
    body: { name, birth, description },
  } = req;
  try {
    await Resume.findOneAndUpdate({ _id: id }, { name, birth: parseInt(birth), description });
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
    resume = await Resume.findById(id);
    if(resume.creator !== req.user.id) {
      throw Error();
    } else {
      req.user.resumes.splice(req.user.resumes.indexOf(id), 1);
      req.user.save();
      recruits = await Recruit.find({});
      for(const recruit in recruits) {
        if (recruit.resumeList.includes(id)) {
          recruit.resumeList.splice(recruit.resumeList.indexOf(id), 1);
          recruit.save();
        }
      }
      await Resume.findOneAndRemove({ _id: id });
    }
  } catch (error) {}
  res.redirect(routes.home);
};
