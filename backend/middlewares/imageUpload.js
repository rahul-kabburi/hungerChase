const multer = require("multer");
const path = require("path");

const imageStoragePath = path.join(__dirname + "../../uploads");

const storage = multer.diskStorage({
  destination: imageStoragePath,
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const uploader = multer({
  storage: storage,
});

module.exports = uploader;
