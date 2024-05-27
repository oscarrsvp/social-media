const { validationResult, check } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => (errors[error.path] = error.msg));

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a first name with at least 3 characters.'),
  check('firstName').not().isEmail().withMessage('First name cannot be an email.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a last name with at least 3 characters.'),
  check('lastName').not().isEmail().withMessage('Last name cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

const validatePost = [
  check('context')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Post cannot be empty.')
    .isLength({ max: 250 })
    .withMessage('Post content must be 250 characters or less.'),
  handleValidationErrors,
];

const validateComment = [
  check('context')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage(`Comment cannot be empty.`)
    .isLength({ max: 250 })
    .withMessage('Comment must be 250 characters or less.'),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validatePost,
  validateComment,
};
