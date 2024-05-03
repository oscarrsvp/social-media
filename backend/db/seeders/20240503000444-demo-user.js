'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: 'Jennifer',
          lastName: 'Smith',
          email: 'jennysmith@aa.io',
          gender: 'female',
          birthday: '05,12,1996',
          relationship: 'single',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Bard',
          lastName: 'Freedman',
          middleName: 'Oliver',
          email: 'bardfreedman@aa.io',
          privacy: true,
          gender: 'male',
          birthday: '08,25,1987',
          relationship: 'married',
          city: 'Evanston',
          hashedPassword: bcrypt.hashSync('password2'),
        },
        {
          firstName: 'Jasmine',
          lastName: 'Lopez',
          email: 'jasminelopex@aa.io',
          privacy: true,
          gender: 'female',
          birthday: '06,07,1974',
          relationship: 'married',
          city: 'Oak Brook',
          hashedPassword: bcrypt.hashSync('password3'),
        },
        {
          firstName: 'Donald',
          lastName: 'Russ',
          email: 'donaledruss@aa.io',
          gender: 'male',
          birthday: '10,14,1990',
          relationship: 'single',
          city: 'Gurnee',
          hashedPassword: bcrypt.hashSync('password4'),
        },
      ],
      { validate: true },
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        firstName: { [Op.in]: ['Jennifer', 'Bard', 'Jasmine', 'Donald'] },
      },
      {},
    );
  },
};
