const express = require('express');
const bcrypt = require('bcryptjs');
const { Op, where } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup, validateUser } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../cloudinary');

const { User, UserPhoto, Follower } = require('../../db/models');

const { getFilteredUsers, getUsersFollowingList } = require('../../middleware/users');

const router = express.Router();

// Get User's Information
router.get(
  '/',
  requireAuth,
  getUsersFollowingList,
  getFilteredUsers(false),
  async (req, res) => {
    const users = req.usersData;

    return res.json({ User: users });
  },
);

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
router.put(
  '/',
  requireAuth,
  singleMulterUpload('headerImg'),
  validateUser,
  async (req, res) => {
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

    const user = await User.findByPk(userId, {
      include: [
        {
          model: UserPhoto,
          where: {
            userId,
            preview: true,
          },
          required: false,
          attributes: ['url'],
        },
      ],
      attributes: {
        include: ['createdAt'],
      },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    let { headerImage } = user;

    const { file } = req;

    if (file) {
      const uploadResult = await singlePublicFileUpload(file);
      headerImage = uploadResult.secure_url;
    }

    const updateUser = await user.update({
      firstName,
      lastName,
      middleName,
      headerImage,
      privacy,
      gender,
      birthday,
      relationship,
      city,
    });

    const updatedUser = updateUser.toJSON();
    updatedUser.profileImage = req.user.UserPhotos.length
      ? req.user.UserPhotos[0].url
      : '';

    delete updatedUser.UserPhotos;

    return res.json(updatedUser);
  },
);

// Current User Information
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId, {
    include: [
      {
        model: UserPhoto,
        where: {
          userId,
        },
        required: false,
        attributes: ['url'],
      },
    ],
  });

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
        attributes: ['id', 'firstName', 'lastName'],
        required: false,
      },
    ],
    attributes: ['followerId'],
  });

  const followerIds = following.map((follower) => follower.followerId);

  const userPhotos = await UserPhoto.findAll({
    where: {
      userId: followerIds,
      preview: true,
    },
    attributes: ['userId', 'url'],
  });

  const followersWithPhotos = following.map((follower) => {
    const photo = userPhotos.find((photo) => photo.userId === follower.followerId);

    const following = follower.toJSON();

    following.Followers.profileImage = photo ? photo.url : null;

    return following;
  });

  return res.json(followersWithPhotos);
});

// Get All Users, current User is not following
router.get(
  '/explore',
  requireAuth,
  getUsersFollowingList,
  getFilteredUsers(true),
  async (req, res) => {
    const users = req.usersData;

    return res.json({ User: users });
  },
);

router.get('/search', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `${name}%` } },
          { lastName: { [Op.like]: `${name}%` } },
        ],
      },
      attributes: ['id', 'firstName', 'lastName'],

      include: [
        {
          model: UserPhoto,
          where: {
            preview: true,
          },
          attributes: ['url'],
          required: false,
        },
      ],
    });

    const userData = users.map((user) => {
      const singleUser = user.toJSON();
      singleUser.profileImg = singleUser.UserPhotos[0].url;

      delete singleUser.UserPhotos;

      return singleUser;
    });

    return res.json(userData);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
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
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
      {
        model: UserPhoto,
        where: {
          userId,
          preview: true,
        },
        required: false,
        attributes: ['url'],
      },
    ],
    attributes: {
      include: ['createdAt'],
    },
  });

  const userData = user.toJSON();

  userData.profileImage = userData.UserPhotos.length ? userData.UserPhotos[0].url : '';

  userData.followingList = {};
  userData.Following.forEach((follow) => {
    userData.followingList[follow.followerId] = { ...follow.Followers };
  });

  delete userData.Following;
  delete userData.UserPhotos;

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
