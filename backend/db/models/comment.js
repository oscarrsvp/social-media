'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
      });
    }
  }
  Comment.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      context: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1 - 250],
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );
  return Comment;
};
