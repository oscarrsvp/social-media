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
          headerImage:
            'https://images.unsplash.com/photo-1620554602348-fc37b9eb4992?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'Female',
          birthday: '05/12/1996',
          relationship: 'Single',
          bio: 'Love spending time with friends, exploring new trails, and chasing breathtaking views. Whether its a cozy hangout or a spontaneous hike, Im always up for making memories and enjoying the little moments in life!',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Bard',
          lastName: 'Freedman',
          middleName: 'Oliver',
          email: 'bardfreedman@aa.io',
          headerImage:
            'https://images.unsplash.com/photo-1575277536302-47de349f2bda?q=80&w=4063&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          privacy: true,
          gender: 'Male',
          birthday: '08/25/1987',
          relationship: 'Married',
          city: 'Evanston',
          bio: 'Reef tank enthusiast 🌊🐠',
          hashedPassword: bcrypt.hashSync('password2'),
        },
        {
          firstName: 'Jasmine',
          lastName: 'Lopez',
          email: 'jasminelopex@aa.io',
          headerImage:
            'https://images.unsplash.com/photo-1541536556867-5c6a7d3cc064?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          privacy: true,
          gender: 'Female',
          birthday: '06/07/1974',
          relationship: 'Married',
          city: 'Oak Brook',
          hashedPassword: bcrypt.hashSync('password3'),
        },
        {
          firstName: 'Donald',
          lastName: 'Russ',
          email: 'donaledruss@aa.io',
          headerImage:
            'https://images.unsplash.com/photo-1515049497350-e9dfc9527f5d?q=80&w=4150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'Male',
          birthday: '10/14/1990',
          relationship: 'Single',
          city: 'Gurnee',
          hashedPassword: bcrypt.hashSync('password4'),
        },
        {
          firstName: 'Patricia',
          lastName: 'Griffin',
          middleName: 'Lynn',
          email: 'patriciagriffin@aa.io',
          headerImage:
            'https://images.unsplash.com/photo-1627748981883-a5e84dc935f5?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'Female',
          birthday: '10/10/1991',
          relationship: 'Single',
          city: 'Gurnee',
          bio: 'Lover of the finer things in life ✨ Fashion, luxury, and elegant experiences are my vibe.',
          hashedPassword: bcrypt.hashSync('password5'),
        },
        {
          firstName: 'James',
          lastName: 'Martin',
          email: 'jamesmartin@aa.io',
          headerImage:
            'https://images.unsplash.com/photo-1520911831154-12889531673c?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'Male',
          birthday: '12/14/1993',
          relationship: 'Single',
          city: 'Chicago',
          hashedPassword: bcrypt.hashSync('password6'),
        },
        {
          firstName: 'Benjamin',
          lastName: 'Mixon',
          email: 'benjaminmixon@aa.io',
          headerImage:
            'https://images.unsplash.com/photo-1636474097055-561065036462?q=80&w=4125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'Male',
          birthday: '03/12/1981',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Katrine',
          lastName: 'Spencer',
          email: 'katrinespencer@aa.io',
          headerImage:
            'https://images.unsplash.com/photo-1592780828756-c418d71faa1f?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          gender: 'Female',
          birthday: '07/25/1997',
          bio: 'I love watching movies, from 90s classics to recent hits. Always up for a good film night!',
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
          [Op.in]: [
            'Jennifer',
            'Bard',
            'Jasmine',
            'Donald',
            'Patricia',
            'James',
            'Benjamin',
            'Katrine',
          ],
        },
      },
      {},
    );
  },
};
