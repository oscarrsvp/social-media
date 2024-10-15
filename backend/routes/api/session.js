const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { handleValidationErrors, validateLogin } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User, UserPhoto } = require('../../db/models');

// Restore session user
router.get('/', (req, res) => {
  const { user } = req;

  const userData = user.toJSON();
  profileImage = userData.UserPhotos.length ? userData.UserPhotos[0].url : '';

  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

// Log in
router.post('/', validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.unscoped().findOne({
    include: [
      {
        model: UserPhoto,
        required: false,
        where: {
          preview: true,
        },
        attributes: ['url'],
      },
    ],
    where: {
      [Op.or]: {
        email,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = { credential: 'The provided credentials were invalid.' };
    return next(err);
  }

  const userData = user.toJSON();
  profileImage = userData.UserPhotos.length ? userData.UserPhotos[0].url : '';

  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

module.exports = router;
