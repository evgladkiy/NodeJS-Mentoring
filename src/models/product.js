'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    color: DataTypes.STRING,
    isFavorite: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    reviews: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};