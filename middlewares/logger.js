const winston = require('winston');
const expressWinston = require('express-winston');

const {
  FILENAME_REQUEST_LOG,
  FILENAME_ERROR_LOG,
} = require('../utils/constants');

// создадим логгер запросов
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: FILENAME_REQUEST_LOG })],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: FILENAME_ERROR_LOG })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
