'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      age: 1,
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
      company: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      age: 30,
      name: 'Brewer Hendrix',
      email: 'brewerhendrix@gmail.com',
      password: 'password',
      company: 'QUANTASIS',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      age: 21,
      name: 'Christy Hodges',
      email: 'christyhodges@gmail.com',
      password: 'password',
      company: 'MONDICIL',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      age: 31,
      name: 'Gwen Velasquez',
      email: 'gwenvelasquez@gmail.com',
      company: 'ZENOLUX',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      age: 30,
      name: 'Ellis Goodwin',
      email: 'ellisgoodwin@gmail.com',
      password: 'password',
      company: 'BUNGA',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      age: 30,
      name: 'Cindy Dejesus',
      email: 'cindydejesus@gmail.com',
      password: 'password',
      company: 'SNACKTION',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      age: 23,
      name: 'Teresa Merrill',
      email: 'teresamerrill@gmail.com',
      password: 'password',
      company: 'PROGENEX',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      age: 34,
      name: 'Estelle Freeman',
      email: 'estellefreeman@gmail.com',
      password: 'password',
      company: 'TOYLETRY',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
