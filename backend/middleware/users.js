const { Op } = require('sequelize');
const { User, UserPhoto, Follower, Post } = require('../db/models');

const getFilteredUsers = (isPostIncluded) => async (req, res, next) => {
  const options = {
    include: [
      {
        model: UserPhoto,
        where: {
          preview: true,
        },
        required: false,
        attributes: ['url'],
      },
    ],
    attributes: ['id', 'firstName', 'lastName'],

    where: {},
  };

  if (isPostIncluded) {
    options.include.push({
      model: Post,
      required: false,
    });

    options.where.id = {
      [Op.notIn]: req.user.followingList,
    };
  }

  const user = await User.findAll(options);

  const users = user.map((users) => {
    const user = users.toJSON();

    user.profileImage = user.UserPhotos.length
      ? user.UserPhotos[user.UserPhotos.length - 1].url
      : '';

    delete user.UserPhotos;
    return user;
  });

  req.usersData = users;
  next();
};

const getUsersFollowingList = async (req, res, next) => {
  const userId = req.user.id;
  const userFollowingList = await Follower.findAll({
    where: {
      userId,
    },
    required: false,
    attributes: ['followerId'],
  });

  const followingIds = userFollowingList.map((follow) => follow.followerId);

  followingIds.push(userId);

  req.user.followingList = followingIds;

  next();
};

module.exports = { getFilteredUsers, getUsersFollowingList };
