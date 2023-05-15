const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { CustomError, NOT_FOUND, INTERNAL_SERVERE_ERROR } = require('./errors/errors');
const router = require('./routes');

const app = express();

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(router);

app.use('*', (req, res, next) => {
  next(new CustomError(NOT_FOUND, 'Страница не найдена'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVERE_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVERE_ERROR
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next();
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('start server');
});
