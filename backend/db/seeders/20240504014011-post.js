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
        {
          userId: 1,
          photo:
            'https://images.unsplash.com/photo-1532635278-872c8b2b3efe?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          context:
            'Four friends, endless laughter, and the perfect poolside paradise! 🌴💦 #SummerFun',
        },
        {
          userId: 3,
          photo:
            'https://images.unsplash.com/photo-1561134013-859b398e7f5c?q=80&w=3550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          context:
            'Pausing in the middle of nowhere, just to capture this moment. 📸✨ #SpontaneousSelfie',
        },
        {
          userId: 5,
          photo:
            'https://images.unsplash.com/photo-1652561751125-91629417d6ae?q=80&w=3503&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          context: '#Relax',
        },
        {
          userId: 5,
          context:
            "This don't feel like home anymore It's just wall, doors, and floors That only I can afford Remember when it used to mean more, mean more I got money in the top drawer That ain't much, but we not poor You're mine and I'm yours ❤️",
        },
        {
          userId: 4,
          context: 'Life is better in a Jeep. 🏕️ #JeepLove',
        },
        {
          userId: 7,
          photo:
            'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          context: 'Always on work mode',
        },
        {
          userId: 7,
          photo:
            'https://images.squarespace-cdn.com/content/v1/55664553e4b0e48846329dc0/1461612416929-CM6HTBRBLAC9X3W013K6/artworks-000044586328-yw1m22-original.jpg',
          context: 'Dropping soon...',
        },
        {
          userId: 7,
          context: 'By 1979 hip hop music had become a mainstream genre.',
        },
        {
          userId: 8,
          photo:
            'https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/02/IMG_0861-scaled.jpeg',
          context: 'Scarface was released on Dec 9, 1983',
        },
        {
          userId: 8,
          photo:
            'https://m.media-amazon.com/images/M/MV5BMzhmNGMzMDMtZDM0Yi00MmVmLWExYjAtZDhjZjcxZDM0MzJhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
          context: 'A MUST SEE!!!! #bestMovie',
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
