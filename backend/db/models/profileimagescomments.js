'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProfileImagesComments extends Model {
    static associate(models) {
      ProfileImagesComments.belongsTo(models.UserPhoto, {
        foreignKey: 'photoId',
      });
      ProfileImagesComments.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  ProfileImagesComments.init(
    {
      context: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1 - 250],
          notEmpty: true,
        },
      },
      photoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProfileImagesComments',
    },
  );
  return ProfileImagesComments;
};
