const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');
const { User, Post, UserPhoto, Follower } = require('../../db/models');
const follower = require('../../db/models/follower');

const router = express.Router();

// Get User's Information
router.get('/', requireAuth, async (req, res) => {
  const user = await User.findAll({
    include: [
      {
        model: Post,
        order: [['createdAt', 'DESC']],
      },
    ],
  });

  return res.json({ User: user });
});

// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ firstName, lastName, email, hashedPassword });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImage: user.profileImage,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

// Update User's Information
router.put('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const {
    firstName,
    lastName,
    middleName,
    privacy,
    gender,
    birthday,
    relationship,
    city,
  } = req.body;

  const user = await User.findByPk(userId);

  const updateUser = await user.update({
    firstName,
    lastName,
    middleName,
    privacy,
    gender,
    birthday,
    relationship,
    city,
  });

  return res.json(updateUser);
});

// Get User By Id
router.get('/:userId', requireAuth, async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId, {
    include: [
      {
        model: Follower,
        as: 'User',
        attributes: ['followerId'],
        required: false,
        separate: true,
      },
      {
        model: Follower,
        as: 'Follower',
        attributes: ['userId'],
        required: false,
        separate: true,
      },
    ],
  });

  return res.json({ User: user });
});

// Following List By User Id
router.get('/:userId/following', requireAuth, async (req, res) => {
  const { userId } = req.params;

  const following = await Follower.findAll({
    where: {
      followerId: userId,
    },
    include: [
      {
        model: User,
        as: 'User',
        attributes: ['firstName', 'lastName', 'profileImage'],
      },
    ],
    attributes: ['userId'],
  });

  const followingList = following.map((follow) => {
    const followers = follow.toJSON();
    followers.fullName = `${followers.User.firstName} ${followers.User.lastName}`;
    followers.profileImage = followers.User.profileImage;

    delete followers.User;

    return followers;
  });

  return res.json({ following: followingList });
});

// Follow User
router.post('/:userId/follow', requireAuth, async (req, res) => {
  const { userId } = req.params;
  const followerId = req.user.id;

  const follow = await Follower.create({ userId, followerId });

  return res.json({ follow });
});

module.exports = router;
