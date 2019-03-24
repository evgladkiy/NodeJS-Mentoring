'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        isFavorite: false,
        color: 'brown',
        name: 'strawberry',
        reviews: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isFavorite: true,
        color: 'green',
        name: 'orange',
        reviews: 34,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isFavorite: false,
        color: 'brown',
        name: 'orange',
        reviews: 39,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isFavorite: false,
        color: 'blue',
        name: 'banana',
        reviews: 27,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isFavorite: true,
        color: 'brown',
        name: 'apple',
        reviews: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isFavorite: true,
        color: 'blue',
        name: 'banana',
        reviews: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
