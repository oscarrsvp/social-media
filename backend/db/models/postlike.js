'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostLike.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      PostLike.belongsTo(models.Post, {
        foreignKey: 'postId',
      });
    }
  }
  PostLike.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      liked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PostLike',
    },
  );
  return PostLike;
};
