const express = require('express');
const router = express.Router();
const { singleMulterUpload, singlePublicFileUpload } = require('../../cloudinary');
const { User, UserPhoto, ProfileImagesComments } = require('../../db/models');

// Delete user photos
router.delete('/images/:photoId', async (req, res) => {
  const { photoId } = req.params;
  const currentUserID = req.user.id;

  const userImages = await UserPhoto.findOne({
    where: {
      id: photoId,
      userId: currentUserID,
    },
  });

  if (!userImages) return res.json({ message: 'User photos not found' });

  if (userImages.userId === currentUserID) {
    await userImages.destroy();

    return res.json({ message: 'Photo deleted' });
  }
});

// Get single photo via ID with comments
router.get('/images/:photoId', async (req, res) => {
  const { photoId } = req.params;

  const userSingleImage = await User.findAll({
    include: [
      {
        model: ProfileImagesComments,
        attributes: ['context', 'photoId', 'createdAt'],
        where: { photoId },
        required: true,
      },
      {
        model: UserPhoto,
        attributes: ['url'],
        where: { preview: true },
        required: false,
      },
    ],
    attributes: ['id', 'firstName', 'lastName'],
  });

  if (!userSingleImage) return res.json({ message: 'User photo not found' });

  const filteredData = userSingleImage.map((user) => ({
    userId: user.id,
    name: `${user.firstName} ${user.lastName}`,
    profileImage: user.UserPhotos[0]?.url || null,
    comment: user.ProfileImagesComments[0].context,
    createdAt: user.ProfileImagesComments[0].createdAt,
  }));

  return res.json({ photoData: filteredData });
});

// Get all photos from user
router.get('/:userId/images', async (req, res) => {
  const { userId } = req.params;

  const userPhotos = await UserPhoto.findAll({
    where: {
      userId,
    },
  });

  if (!userPhotos) return res.json({ message: 'No photos found ' });

  return res.json({ Photos: userPhotos });
});

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
