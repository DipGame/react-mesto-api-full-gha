// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { CustomError, UNAUTHORIZED } = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new CustomError(UNAUTHORIZED, 'Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new CustomError(UNAUTHORIZED, 'Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
