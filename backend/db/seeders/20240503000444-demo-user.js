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
          profileImage:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHx1c2VyJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
          headerImage:
            'https://images.unsplash.com/photo-1620554602348-fc37b9eb4992?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'female',
          birthday: '05/12/1996',
          relationship: 'single',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Bard',
          lastName: 'Freedman',
          middleName: 'Oliver',
          email: 'bardfreedman@aa.io',
          profileImage:
            'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=2363&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          headerImage:
            'https://images.unsplash.com/photo-1575277536302-47de349f2bda?q=80&w=4063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          privacy: true,
          gender: 'male',
          birthday: '08/25/1987',
          relationship: 'married',
          city: 'Evanston',
          hashedPassword: bcrypt.hashSync('password2'),
        },
        {
          firstName: 'Jasmine',
          lastName: 'Lopez',
          email: 'jasminelopex@aa.io',
          profileImage:
            'https://images.unsplash.com/photo-1561132669-a87da5502336?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          headerImage:
            'https://images.unsplash.com/photo-1541536556867-5c6a7d3cc064?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          privacy: true,
          gender: 'female',
          birthday: '06/07/1974',
          relationship: 'married',
          city: 'Oak Brook',
          hashedPassword: bcrypt.hashSync('password3'),
        },
        {
          firstName: 'Donald',
          lastName: 'Russ',
          email: 'donaledruss@aa.io',
          profileImage:
            'https://images.unsplash.com/photo-1531901599143-df5010ab9438?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          headerImage:
            'https://images.unsplash.com/photo-1515049497350-e9dfc9527f5d?q=80&w=4150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'male',
          birthday: '10/14/1990',
          relationship: 'single',
          city: 'Gurnee',
          hashedPassword: bcrypt.hashSync('password4'),
        },
        {
          firstName: 'Patricia',
          lastName: 'Griffin',
          middleName: 'Lynn',
          email: 'patriciagriffin@aa.io',
          profileImage:
            'https://images.unsplash.com/photo-1627748868900-f2decee603e9?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          headerImage:
            'https://images.unsplash.com/photo-1627748981883-a5e84dc935f5?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'female',
          birthday: '10/10/1991',
          relationship: 'single',
          city: 'Gurnee',
          hashedPassword: bcrypt.hashSync('password5'),
        },
        {
          firstName: 'James',
          lastName: 'Martin',
          email: 'jamesmartin@aa.io',
          profileImage:
            'https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?q=80&w=4074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          headerImage:
            'https://images.unsplash.com/photo-1520911831154-12889531673c?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'male',
          birthday: '12/14/1993',
          relationship: 'single',
          city: 'Chicago',
          hashedPassword: bcrypt.hashSync('password6'),
        },
        {
          firstName: 'Benjamin',
          lastName: 'Mixon',
          email: 'benjaminmixon@aa.io',
          profileImage:
            'https://images.unsplash.com/photo-1669475535978-7479ef74e14f?q=80&w=3409&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          headerImage:
            'https://images.unsplash.com/photo-1636474097055-561065036462?q=80&w=4125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'male',
          birthday: '03/12/1981',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Katrine',
          lastName: 'Spencer',
          email: 'katrinespencer@aa.io',
          profileImage:
            'https://images.unsplash.com/photo-1603217039863-aa0c865404f7?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          headerImage:
            'https://images.unsplash.com/photo-1592780828756-c418d71faa1f?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'female',
          birthday: '07/25/1997',
          hashedPassword: bcrypt.hashSync('password'),
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
        firstName: {
          [Op.in]: ['Jennifer', 'Bard', 'Jasmine', 'Donald', 'Patricia', 'James'],
        },
      },
      {},
    );
  },
};
