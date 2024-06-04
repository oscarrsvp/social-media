const express = require('express');
const router = express.Router();
const { PostLike } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.use(requireAuth);

router.post('/:postId', async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  const post = await PostLike.findByPk(postId);

  if (!post) return res.status(404).json({ message: `Post not found` });

  const postLike = await PostLike.create({
    userId,
    postId,
    liked: true,
  });

  return res.json(postLike);
});

router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  const postLike = await PostLike.findOne({
    where: {
      userId,
      postId,
    },
  });

  if (!postLike) return res.status(404).json({ message: `Post not found` });

  await postLike.destroy();

  return res.json({ message: `Post unliked` });
});

module.exports = router;
