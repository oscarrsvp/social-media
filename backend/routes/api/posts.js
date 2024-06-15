const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { validatePost, validateComment } = require('../../utils/validation');
const { User, Post, Comment, PostLike } = require('../../db/models');

router.use(requireAuth);

// Get all User's Posts
router.get('/', async (req, res) => {
  const post = await Post.findAll({
    include: {
      model: PostLike,
      where: {
        liked: true,
      },
      attributes: ['userId'],
      required: true,
      separate: true,
    },
  });

  const postLiked = post.map((post) => {
    const like = post.toJSON();
    like.likes = {};
    like.PostLikes.forEach((user) => {
      like.likes[user.userId] = true;
    });
    delete like.PostLikes;
    return like;
  });

  return res.json(postLiked);
});

// Get all Post by userId
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const post = await Post.findAll({
    include: {
      model: PostLike,
      where: {
        liked: true,
      },
      attributes: ['userId'],
      required: true,
      separate: true,
    },
    where: {
      userId,
    },
  });

  const postLiked = post.map((post) => {
    const like = post.toJSON();
    like.likes = {};
    like.PostLikes.forEach((user) => {
      like.likes[user.userId] = true;
    });
    delete like.PostLikes;
    return like;
  });

  return res.json(postLiked);
});

// Create a new Post
router.post('/', validatePost, async (req, res) => {
  const userId = req.user.id;
  const { photo, context } = req.body;

  const newPost = await Post.create({
    userId,
    photo,
    context,
  });

  const postLikes = newPost.toJSON();
  postLikes.likes = {};

  return res.status(201).json(postLikes);
});

// Get a Post by Id
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: `Post not found` });

  return res.json(post);
});

// Edit a Post
router.put('/:postId', validatePost, async (req, res) => {
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

  const getComments = await Comment.findAll({
    include: {
      model: User,
      attributes: ['firstName', 'lastName', 'profileImage'],
    },
    where: {
      postId,
    },
  });

  const comments = getComments.map((comment) => {
    const comments = comment.toJSON();
    comments.fullName = `${comments.User.firstName} ${comments.User.lastName}`;
    comments.profileImg = comments.User.profileImage;

    delete comments.User;

    return comments;
  });

  return res.json({ Comments: comments });
});

// Create a new Comment
router.post('/:postId/comment', validateComment, async (req, res) => {
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

  const comment = newComment.toJSON();
  comment.fullName = `${req.user.firstName} ${req.user.lastName}`;
  comment.profileImg = req.user.profileImage;

  return res.status(201).json(comment);
});

// Like a Post
router.post('/:postId/likes', async (req, res) => {
  const { postId } = req.params;
  const { liked } = req.body;
  const userId = req.user.id;

  const post = await Post.findByPk(postId);

  if (!post) return res.status(404).json({ message: `Post not found` });

  const postLike = await PostLike.create({
    userId,
    postId,
    liked,
  });

  return res.json(postLike);
});

// Unlike a Post
router.delete('/:postId/likes', async (req, res) => {
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
