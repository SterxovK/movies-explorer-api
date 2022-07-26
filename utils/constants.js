const SCHEMA_MOVIE_VALIDATE_MESSAGES = {
  IMAGE: 'не URL для постера к фильму',
  TRAILER: 'не URL для трейлера к фильму',
  THUMBNAIL: 'не URL для минипостера к фильму',
};

const SCHEMA_USER_VALIDATE_MESSAGES = {
  EMAIL: 'не является EMAIL',
  PASSWORD: 'Ненадежный пароль',
  NAME: 'длинна строки должна быть от 2 до 30 символов',
};

const AUTH_ERROR_MASSAGE = 'Неправильные почта или пароль';

const VALIDATION_ERROR_NAME = 'ValidationError';
const CAST_ERROR_NAME = 'CastError';
const MOVIE_NOT_FOUND_MESSAGE = 'фильм не найден';
const FORBIDDEN_ERROR_MESSAGE = 'нет доступа к удалению';
const USER_NOT_FOUND_MESSAGE = 'Нет пользователя с таким id';
const CAST_ERROR_MESSAGE = 'Некорректный id пользователя';
const CONFLICT_EMAIL_ERROR = 'Такой Email уже существует';
const NOT_VALIDATION_URL = 'Некорректная ссылка';
const NOT_FOUND_ERROR_MESSAGE = 'Страница не найдена';
const NOT_AUTH_ERROR_MESSAGE = 'Необходима авторизация';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

const FILENAME_REQUEST_LOG = 'request.log';
const FILENAME_ERROR_LOG = 'error.log';

const REGEX = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
const { NODE_ENV, DATABASE_URL } = process.env;
const MONGODB_ADDRESS = NODE_ENV === 'production'
  ? DATABASE_URL
  : 'mongodb://localhost:27017/moviesdb';
const PORT_ADDRESS = 3000;

const CORS_ORIGIN = [
  'http://localhost:3001',
  'https://api.diploma.sterkhov.nomoredomains.xyz',
];

module.exports = {
  SCHEMA_MOVIE_VALIDATE_MESSAGES,
  SCHEMA_USER_VALIDATE_MESSAGES,
  AUTH_ERROR_MASSAGE,
  VALIDATION_ERROR_NAME,
  MOVIE_NOT_FOUND_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  CAST_ERROR_MESSAGE,
  CAST_ERROR_NAME,
  CONFLICT_EMAIL_ERROR,
  REGEX,
  NOT_VALIDATION_URL,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_AUTH_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  FILENAME_REQUEST_LOG,
  FILENAME_ERROR_LOG,
  MONGODB_ADDRESS,
  PORT_ADDRESS,
  CORS_ORIGIN,
};
