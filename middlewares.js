import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});

const multerImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "profile-finder/image"
  })
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "profile-finder/avatar"
  })
});

export const uploadImage = multerImage.fields([{ name: 'profileImg1' }, { name: 'profileImg2' }, { name: 'profileImg3' }]);
export const uploadAvatar = multerAvatar.single("avatar");

export const formatDate = date => {
  const d = new Date(date);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join(". ");
};

export const redirectUrl = string => {
  if (string !== undefined && string.charAt(0) === "u") {
    return `/${string}`;
  }
  return string;
};

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "프로필 파인더";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  res.locals.formatDate = formatDate;
  res.locals.redirect = redirectUrl;
  // console.log(req.user)
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};


