const multer = require('multer');
const cloudinary = require('../cloudinary');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Set the maximum file size to 50 MB
});

const uploadProfileImg = upload.single('profileImage');
const multipleUploads = upload.fields([
  { name: 'profileImage' },
  { name: 'headerImage' },
]);

async function uploadToCloudinary(file) {
  try {
    const upload = await cloudinary.uploader.upload(file.path);
    return upload;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

module.exports = {
  uploadProfileImg,
  multipleUploads,
  uploadToCloudinary,
};
