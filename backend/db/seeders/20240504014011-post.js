'use strict';

const { Post } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Post.bulkCreate(
      [
        {
          userId: 1,
          photo:
            'https://cdn.outsideonline.com/wp-content/uploads/2021/07/friends-outside-hiking_s.jpg',
          context: 'Finding joy in every step 🌲👣 #HikingAdventures #FriendshipGoals',
        },
        {
          userId: 2,
          photo:
            'https://reefcasa.com/wp-content/uploads/2022/12/All-in-one-mini-reef.jpg',
          context: 'Coral symphony in my reef sanctuary 🐠✨ #UnderwaterMagic #ReefLife',
        },
        {
          userId: 3,
          photo:
            'https://images.squarespace-cdn.com/content/v1/62689634e9da29777befb7fd/1651359146738-IJSDKSHD3MHH4TF5L0TD/unsplash-image-0GOhq_qwitA.jpg',
          context: 'Savoring every sip and moment ☕️💬 #CoffeeDate #ChatsAndLattes',
        },
        {
          userId: 2,
          context: 'I just found some cheap live french oysters! what a deal',
        },
      ],
      { validate: true },
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Posts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1, 2, 3] },
      },
      {},
    );
  },
};
