const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Post } = require('../../db/models');

router.use(requireAuth);

// Get User's Posts
router.get('/', async (req, res) => {
  const post = await Post.findAll();

  return res.json(post);
});

router.post('/', async (req, res) => {
  const userId = req.user.id;
  const { photo, context } = req.body;

  const newPost = await Post.create({
    userId,
    photo,
    context,
  });

  return res.status(201).json(newPost);
});

router.put('/:postId', async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const { photo, context } = req.body;

  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: `Post not found` });

  if (post.userId === userId) {
    const updatePost = await post.update({
      photo,
      context,
    });

    return res.json(updatePost);
  }
});

router.delete('/:postId', async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: `Post not found` });

  if (post.userId === userId) {
    await post.destroy();

    return res.json({ message: `Post deleted` });
  }
});

module.exports = router;
