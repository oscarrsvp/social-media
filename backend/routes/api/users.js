const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();

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

module.exports = router;
