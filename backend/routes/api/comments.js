const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { validateComment } = require('../../utils/validation');
const { Comment } = require('../../db/models');

router.use(requireAuth);

// Update a Comment
router.put('/:commentId', validateComment, async (req, res) => {
  const userId = req.user.id;
  const { context } = req.body;
  const { commentId } = req.params;
  const { firstName, lastName } = req.user;

  const comment = await Comment.findByPk(commentId);

  if (!comment) return res.status(404).json({ message: `Comment not found` });

  if (comment.userId === userId) {
    const updateComment = await comment.update({
      context,
    });

    const updatedComments = updateComment.toJSON();
    updatedComments.fullName = `${firstName} ${lastName}`;
    updatedComments.profileImg = req.user.profileImage;

    return res.json(updatedComments);
  }
});

// Delete a Comment
router.delete('/:commentId', async (req, res) => {
  const userId = req.user.id;
  const { commentId } = req.params;

  const comment = await Comment.findByPk(commentId);

  if (!comment) return res.status(404).json({ message: `Comment not found` });

  if (comment.userId === userId) {
    await comment.destroy();
    return res.json({ message: `Successfully deleted` });
  }
});

module.exports = router;
