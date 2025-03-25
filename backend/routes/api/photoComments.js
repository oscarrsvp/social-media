const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { validateComment } = require('../../utils/validation');
const { ProfileImagesComments } = require('../../db/models');

router.use(requireAuth);

// Update Photo Comment
router.put('/:commentId', validateComment, async (req, res) => {
  const userId = req.user.id;
  const { context } = req.body;
  const { commentId } = req.params;
  const { firstName, lastName } = req.user;

  const photoComment = await ProfileImagesComments.findByPk(commentId);

  if (!photoComment) return res.status(404).json({ message: `Comment not found` });

  if (photoComment.userId === userId) {
    const updatePhotoComment = await ProfileImagesComments.update({
      context,
    });

    const updatedComment = updatePhotoComment.toJSON();
    updatedComment.fullName = `${firstName} ${lastName}`;
    updatedComment.profileImg = req.user.profileImage;

    return res.json(updatedComment);
  }
});

// Delete Photo Comment
router.delete('/:commentId', async (req, res) => {
  const userId = req.user.id;
  const { commentId } = req.params;

  const photoComment = await ProfileImagesComments.findByPk(commentId);

  if (!photoComment) return res.status(404).json({ message: `Comment not found` });

  if (photoComment.userId === userId) {
    await photoComment.destroy();
    return res.json({ message: `Successfully deleted` });
  }
});

module.exports = router;
