const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const postsRouter = require('./posts.js');
const commentsRouter = require('./comments.js');
const userPhotosRouter = require('./userPhotos.js');
const photoCommentRouter = require('./photoComments.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/photos', userPhotosRouter);
router.use('/images', photoCommentRouter);

module.exports = router;
