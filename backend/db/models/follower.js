'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follower.belongsTo(models.User, {
        as: 'Following',
        foreignKey: 'userId',
      });
      Follower.belongsTo(models.User, {
        as: 'Followers',
        foreignKey: 'followerId',
      });
    }
  }
  Follower.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Follower',
    },
  );
  return Follower;
};
