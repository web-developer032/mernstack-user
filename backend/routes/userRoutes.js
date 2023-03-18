const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const userController = require("../controllers/userController");

const router = express.Router();

// FOR STORRING FILE ON DISK
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// FOR STORRING FILE ON MEMORY
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb("Invalid File, Please upload Image.", false);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const uploadUserPhoto = upload.single("profile"); // UPLOAD SINGLE FILE

async function resizeFunction(req) {
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
}

async function resizeUserPhoto(req, res, next) {
    if (!req.file) return next();
    req.file.filename = `user-${Math.random()}-${Date.now()}.jpeg`;

    await resizeFunction(req);

    return next();
}

router
    .route("/")
    .get(userController.getAllUsers)
    .post(uploadUserPhoto, resizeUserPhoto, userController.createUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
