'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPhoto.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      UserPhoto.hasMany(models.ProfileImagesComments, {
        foreignKey: 'photoId',
        onDelete: 'CASCADE',
        hooks: true,
      });
    }
  }
  UserPhoto.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preview: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'UserPhoto',
    },
  );
  return UserPhoto;
};
