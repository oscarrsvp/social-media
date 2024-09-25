const express = require('express');
const router = express.Router();
const { singleMulterUpload, singlePublicFileUpload } = require('../../cloudinary');
const { User, UserPhoto } = require('../../db/models');

router.post('/:userId/profileImg', singleMulterUpload('profileImg'), async (req, res) => {
  const currentUserID = req.user.id;
  const { userId } = req.params;

  let { url, preview } = req.body;

  const user = await User.findByPk(userId);

  if (!user) {
    return res.json({ message: 'User not found' });
  }

  if (user.id === currentUserID) {
    const { file } = req;

    if (file) {
      const profileImg = await singlePublicFileUpload(file);
      url = profileImg.secure_url;

      const newImage = await UserPhoto.create({
        userId: currentUserID,
        url,
        preview,
      });

      return res.json({
        id: newImage.id,
        userId: newImage.userId,
        url: newImage.url,
        preview: newImage.preview,
      });
    }
  }

  res.status(403).json({ message: `Forbidden, Not Authorize` });
});

module.exports = router;
