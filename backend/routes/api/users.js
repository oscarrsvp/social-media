const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup, validateUser } = require('../../utils/validation');
const { User, Post, Follower } = require('../../db/models');

const router = express.Router();

// Get User's Information
router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const userFollowingList = await Follower.findAll({
    where: {
      userId,
    },
    attributes: ['followerId'],
  });

  const followingIds = userFollowingList.map((follow) => follow.followerId);
  followingIds.push(userId);

  const user = await User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'profileImage'],
    where: {
      id: followingIds,
    },
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
router.put('/', requireAuth, validateUser, async (req, res) => {
  const userId = req.user.id;
  const {
    firstName,
    lastName,
    middleName,
    profileImage,
    headerImage,
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
    profileImage,
    headerImage,
    privacy,
    gender,
    birthday,
    relationship,
    city,
  });

  return res.json(updateUser);
});

// Current User Information
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);

  if (!user) return res.status(404).json({ message: 'User not found' });

  return res.json(user);
});

// Following List By current User
router.get('/following', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const following = await Follower.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: User,
        as: 'Followers',
        attributes: ['id', 'firstName', 'lastName', 'profileImage'],
        required: false,
      },
    ],
    attributes: ['followerId'],
  });

  return res.json(following);
});

// Get All Users, current User is not following
router.get('/explore', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const userFollowingList = await Follower.findAll({
    where: {
      userId,
    },
    attributes: ['followerId'],
  });

  const followingIds = userFollowingList.map((follow) => follow.followerId);
  followingIds.push(userId);

  const user = await User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'profileImage'],
    where: {
      id: {
        [Op.notIn]: followingIds,
      },
    },
    include: [
      {
        model: Post,
        required: false,
      },
    ],
  });

  return res.json({ User: user });
});

// Get User By Id
router.get('/:userId', requireAuth, async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId, {
    include: [
      {
        model: Follower,
        as: 'Following',
        attributes: ['followerId'],
        required: false,
        include: [
          {
            model: User,
            as: 'Followers',
            attributes: ['id', 'firstName', 'lastName', 'profileImage'],
          },
        ],
      },
    ],
  });

  const userData = user.toJSON();

  userData.followingList = {};
  userData.Following.forEach((follow) => {
    userData.followingList[follow.followerId] = { ...follow.Followers };
  });

  delete userData.Following;

  return res.json({ User: userData });
});

// Follow User
router.post('/:userId/follow', requireAuth, async (req, res) => {
  const { userId } = req.params;
  const followerId = req.user.id;

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await Follower.create({ followerId: userId, userId: followerId });

  const response = {
    id: userId,
    profileImage: user.profileImage,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return res.json(response);
});

//Unfollow User
router.delete('/:userId/follow', requireAuth, async (req, res) => {
  const { userId } = req.params;
  const followerId = req.user.id;

  const follow = await Follower.findOne({
    where: {
      followerId: userId,
      userId: followerId,
    },
  });

  await follow.destroy();

  return res.json({ message: 'Successfully unfollow user' });
});

module.exports = router;
