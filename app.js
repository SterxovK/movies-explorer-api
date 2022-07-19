require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const error = require('./middlewares/error');
const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  MONGODB_ADDRESS,
  PORT_ADDRESS,
  CORS_ORIGIN,
} = require('./utils/constants');

const app = express();

const { PORT = PORT_ADDRESS } = process.env;

// ??
app.use(cookieParser());

mongoose.connect(MONGODB_ADDRESS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(requestLogger);

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
