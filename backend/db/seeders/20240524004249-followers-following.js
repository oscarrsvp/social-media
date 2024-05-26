'use strict';

const { Follower } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Follower.bulkCreate(
      [
        {
          userId: 1,
          followerId: 2,
        },
        {
          userId: 1,
          followerId: 3,
        },
        {
          userId: 1,
          followerId: 4,
        },
        {
          userId: 1,
          followerId: 5,
        },
        {
          userId: 2,
          followerId: 1,
        },
        {
          userId: 2,
          followerId: 3,
        },
        {
          userId: 2,
          followerId: 4,
        },
        {
          userId: 2,
          followerId: 6,
        },
        {
          userId: 3,
          followerId: 1,
        },
        {
          userId: 3,
          followerId: 2,
        },
        {
          userId: 3,
          followerId: 4,
        },
        {
          userId: 3,
          followerId: 5,
        },
        {
          userId: 4,
          followerId: 1,
        },
        {
          userId: 4,
          followerId: 2,
        },
        {
          userId: 4,
          followerId: 3,
        },
        {
          userId: 5,
          followerId: 1,
        },
        {
          userId: 6,
          followerId: 1,
        },
        {
          userId: 6,
          followerId: 4,
        },
        {
          userId: 6,
          followerId: 3,
        },
      ],
      { validate: true },
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Followers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: {
          [Op.in]: [1, 2, 3, 4, 5, 6],
        },
      },
      {},
    );
  },
};
