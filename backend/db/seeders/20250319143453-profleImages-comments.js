'use strict';

const { ProfileImagesComments } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ProfileImagesComments.bulkCreate(
      [
        {
          context: 'Beautiful face',
          userId: 2,
          photoId: 1,
        },
        {
          context: 'Wow professional photo',
          userId: 3,
          photoId: 1,
        },
        {
          context: 'Gorgeous',
          userId: 1,
          photoId: 4,
        },
        {
          context: 'very lovely',
          userId: 3,
          photoId: 4,
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
