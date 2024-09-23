require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const path = require('path');
const multer = require('multer');
const DatauriParser = require('datauri/parser');

const parser = new DatauriParser();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const singlePublicFileUpload = async (file) => {
  const data = formatBufferTo64(file);
  return await cloudinary.uploader.upload(data.content);
};

const storage = multer.memoryStorage({
  destination: function (_req, _file, callback) {
    callback(null, '');
  },
});

const singleMulterUpload = (nameOfKey) => multer({ storage: storage }).single(nameOfKey);

module.exports = {
  singlePublicFileUpload,
  singleMulterUpload,
};
