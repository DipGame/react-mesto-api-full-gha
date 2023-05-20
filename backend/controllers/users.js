// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const {
  NOT_FOUND, CREATED, UNAUTHORIZED, CONFLICT, OK, CustomError, BAD_REQUEST,
} = require('../errors/errors');

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      })
        .then(() => {
          res.status(CREATED).send({
            email, name, about, avatar,
          });
        })
        .catch((err) => {
          if (err.errors.email.kind === 'unique') {
            next(new CustomError(CONFLICT, 'Пользователь уже существует'));
          } if (err.name === 'ValidationError') {
            next(new CustomError(BAD_REQUEST, 'Некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new CustomError(UNAUTHORIZED, 'Пароль или Email неверные'));
        return;
      }
      bcrypt.compare(password, user.password)
        .then((fff) => {
          if (!fff) {
            return next(new CustomError(UNAUTHORIZED, 'Пароль или Email неверные'));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.status(OK).send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

const getAllUser = (req, res, next) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new CustomError(NOT_FOUND, 'Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(BAD_REQUEST, 'Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const patchAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((updateUser) => {
      res.send(updateUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CustomError(BAD_REQUEST, 'Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUser,
  getAllUser,
  patchUser,
  patchAvatar,
  login,
  getMe,
};
