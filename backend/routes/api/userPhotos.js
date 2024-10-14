const express = require('express');
const router = express.Router();
const { singleMulterUpload, singlePublicFileUpload } = require('../../cloudinary');
const { User, UserPhoto } = require('../../db/models');

router.post('/:userId/profileImg', singleMulterUpload('profileImg'), async (req, res) => {
  const currentUserID = req.user.id;
  const { userId } = req.params;

  let { url } = req.body;

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
        preview: false,
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

router.put('/:userId/profileImg', async (req, res) => {
  const userId = req.user.id;
  const { id, preview } = req.body;

  await UserPhoto.update(
    { preview: false },
    {
      where: {
        userId,
        preview: true,
      },
    },
  );

  if (preview) {
    const updatedImage = await UserPhoto.findByPk(id);

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await updatedImage.update({ preview: true });

    return res.json(updatedImage);
  }
});

module.exports = router;
