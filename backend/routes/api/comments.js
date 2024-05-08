const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models');

router.use(requireAuth);

// Update a Comment
router.put('/:commentId', async (req, res) => {
  const userId = req.user.id;
  const { context } = req.body;
  const { commentId } = req.params;

  const comment = await Comment.findByPk(commentId);

  if (!comment) return res.status(404).json({ message: `Comment not found` });

  if (comment.userId === userId) {
    const updateComment = await comment.update({
      context,
    });

    return res.json(updateComment);
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
