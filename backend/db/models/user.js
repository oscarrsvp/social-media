'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      User.hasMany(models.UserPhoto, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      User.hasMany(models.PostLike, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true,
      });

      User.hasMany(models.Follower, {
        as: 'Following',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      User.hasMany(models.Follower, {
        as: 'Followers',
        foreignKey: 'followerId',
        onDelete: 'CASCADE',
        hooks: true,
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 50],
          isAlpha: true,
          notEmpty: true,
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 50],
          isAlpha: true,
          notEmpty: true,
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      middleName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      headerImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      privacy: DataTypes.BOOLEAN,
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Rather Not Say',
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      relationship: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Rather Not Say',
      },
      city: DataTypes.STRING,
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
          notEmpty: true,
        },
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 250],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    },
  );
  return User;
};
