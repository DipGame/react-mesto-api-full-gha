const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/cards', cardRouter);
router.use('/', userRouter);

module.exports = router;
