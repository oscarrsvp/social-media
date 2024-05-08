const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');
const { User, Post } = require('../../db/models');

const router = express.Router();

// Get User's Information
router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const user = await User.findAll({
    include: Post,
    where: {
      id: {
        [Op.ne]: userId,
      },
    },
  });

  return res.json({ User: user });
});

// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ firstName, lastName, email, hashedPassword });

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

// Update User's Information
router.put('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const {
    firstName,
    lastName,
    middleName,
    privacy,
    gender,
    birthday,
    relationship,
    city,
  } = req.body;

  const user = await User.findByPk(userId);

  const updateUser = await user.update({
    firstName,
    lastName,
    middleName,
    privacy,
    gender,
    birthday,
    relationship,
    city,
  });

  return res.json(updateUser);
});

module.exports = router;
