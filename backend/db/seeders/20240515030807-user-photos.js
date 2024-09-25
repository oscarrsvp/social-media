'use strict';

const { UserPhoto } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await UserPhoto.bulkCreate(
      [
        {
          userId: 1,
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHx1c2VyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
          preview: true,
        },
        {
          userId: 2,
          url: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=2363&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          preview: true,
        },
        {
          userId: 3,
          url: 'https://images.unsplash.com/photo-1561132669-a87da5502336?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          preview: true,
        },
        {
          userId: 4,
          url: 'https://images.unsplash.com/photo-1531901599143-df5010ab9438?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          preview: true,
        },
        {
          userId: 5,
          url: 'https://images.unsplash.com/photo-1627748868900-f2decee603e9?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          preview: true,
        },
        {
          userId: 6,
          url: 'https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?q=80&w=4074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          preview: true,
        },
        {
          userId: 7,
          url: 'https://images.unsplash.com/photo-1669475535978-7479ef74e14f?q=80&w=3409&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          preview: true,
        },
        {
          userId: 8,
          url: 'https://images.unsplash.com/photo-1603217039863-aa0c865404f7?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          preview: true,
        },
      ],
      { validate: true },
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'UserPhotos';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1, 2, 3, 4] },
      },
      {},
    );
  },
};
