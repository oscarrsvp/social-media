const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { User, Post, Comment } = require('../../db/models');

router.use(requireAuth);

// Get all User's Posts
router.get('/', async (req, res) => {
  const post = await Post.findAll({
    include: [{ model: User }, { model: Comment, include: User }],
  });

  const allPost = post.map((post) => {
    const posts = post.toJSON();

    const numComments = posts.Comments.length;
    posts.numOfComments = numComments;

    posts.Comments.forEach((comment) => {
      comment.fullName = `${comment.User.firstName} ${comment.User.lastName}`;
      delete comment.User;
    });

    return posts;
  });

  return res.json(allPost);
});

// Create a new Post
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

// Get a Post by Id
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: `Post not found` });

  return res.json(post);
});

// Edit a Post
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

// Delete a Post
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

// Get all Comments from a Post
router.get('/:postId/comments', async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: `Post not found` });

  const getCommentsFromPost = await Comment.findAll({
    include: {
      model: User,
      attributes: ['firstName', 'lastName'],
    },
    where: {
      postId,
    },
  });

  return res.json({ Comments: getCommentsFromPost });
});

// Create a new Comment
router.post('/:postId/comment', async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const { context } = req.body;

  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: `Post not found` });

  const newComment = await Comment.create({
    userId,
    postId,
    context,
  });

  return res.status(201).json(newComment);
});

module.exports = router;
