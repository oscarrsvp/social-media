'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        middleName: {
          type: Sequelize.STRING(30),
        },
        email: {
          type: Sequelize.STRING(256),
          allowNull: false,
          unique: true,
        },
        headerImage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        privacy: {
          type: Sequelize.BOOLEAN,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'Rather Not Say',
        },
        birthday: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        relationship: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'Rather Not Say',
        },
        city: {
          type: Sequelize.STRING,
        },
        bio: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        hashedPassword: {
          type: Sequelize.STRING.BINARY,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options,
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.dropTable(options);
  },
};
