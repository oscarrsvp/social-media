'use strict';

const { post } = require('../../routes/api/comments');
const { Comment } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate(
      [
        {
          userId: 2,
          postId: 1,
          context: 'Wow, what a view! 😍',
        },
        {
          userId: 3,
          postId: 1,
          context: 'I love hiking too! 🥾',
        },
        {
          userId: 1,
          postId: 3,
          context: 'Beautiful! 🐠',
        },
        {
          userId: 1,
          postId: 5,
          context: 'I love oysters! 🦪',
        },
        {
          userId: 4,
          postId: 4,
          context: 'catching up over coffee is the best! ☕️',
        },
        {
          userId: 4,
          postId: 3,
          context: 'I love the colors! Corals look awesome!',
        },
        {
          userId: 4,
          postId: 1,
          context: 'I wish I was there!',
        },
        {
          userId: 4,
          postId: 4,
          context:
            'I love coffee dates! Nothing beats good company and a warm cup of coffee.',
        },
      ],
      { validate: true },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
