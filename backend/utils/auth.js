const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, UserPhoto } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  // Create the token.
  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === 'production';

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax',
  });

  return token;
};

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
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
        attributes: {
          include: ['email', 'createdAt', 'updatedAt'],
        },
      });
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    req.user.profileImage = req.user.UserPhotos.length
      ? req.user.UserPhotos[0].url
      : null;

    return next();
  });
};

const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
};

module.exports = { setTokenCookie, restoreUser, requireAuth };
