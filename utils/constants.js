const BAD_REQUEST = 'Неверно переданы данные';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const BAD_URL = 'не является URL адресом';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Нет фильма с таким id';
const VALIDATION_ERROR_NAME = 'ValidationError';
const ERROR_KIND_OBJECT_ID = 'ObjectId';
const FORBIDDEN_DELETE_MOVIE_MESSAGE = 'Нет доступа к удалению фильма';
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемый ресурс не найден';
const NOT_AUTH_ERROR = 'Необходима авторизация';
const NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD = 'Неправильные почта или пароль';
const REQUEST_LOG_FILENAME = 'request.log';
const ERROR_LOG_FILENAME = 'error.log';

const MONGO_DB_ADDRESS = 'mongodb://localhost:27017/movies-explorer-db';
const PORT_NUMBER = 3000;
const ALLOWED_CORS = [
  'http://localhost:3001',
  'https://api.cinema-explorer.students.nomoredomains.icu',
  'https://cinema-explorer.students.nomoredomains.icu',
];

const USER_SCHEMA_REQUIRED_MESSAGES = {
  EMAIL: 'Поле-строка "email - электронная почта" является обязательным',
  PASSWORD: 'Поле-строка "password - пароль" является обязательным',
  NAME: 'Поле-строка "name - имя пользователя" является обязательным',
};
const USER_SCHEMA_VALIDATE_MESSAGES = {
  EMAIL: 'не является email',
  PASSWORD: 'Внесённый пароль не является надёжным',
  NAME: 'не соответсвует диапазону длины строки - от 2 до 30 символов',
};

const MOVIE_SCHEMA_REQUIRED_MESSAGES = {
  COUNTRY: 'Поле-строка "country - страна" является обязательным',
  DIRECTOR: 'Поле-строка "director - режиссёр" является обязательным',
  DURATION: 'Поле-число "duration - хронометраж" является обязательным',
  YEAR: 'Поле-строка "year - год" является обязательным',
  DESCRIPTION: 'Поле-строка "description - описание" является обязательным',
  NAME_RU: 'Поле-строка "nameRU - название фильма на русском языке" является обязательным',
  NAME_EN: 'Поле-строка "nameEN - название фильма на английском языке" является обязательным',
  IMAGE: 'Поле-строка "image - ссылка на постер к фильму" является обязательным',
  TRAILER: 'Поле-строка "trailer - ссылка на трейлер фильма" является обязательным',
  THUMBNAIL: 'Поле-строка "thumbnail - миниатюрное изображение постера к фильму" является обязательным',
  OWNER: 'Поле-строка "owner - _id пользователя, который сохранил статью" является обязательным',
  MOVIE_ID: 'Поле-число "movieId - id фильма, который содержится в ответе сервиса MoviesExplorer" является обязательным',
};
const MOVIE_SCHEMA_VALIDATE_MESSAGES = {
  IMAGE: 'не является URL адресом для постера к фильму',
  TRAILER: 'не является URL адресом для трейлера к фильму',
  THUMBNAIL: 'не является URL адресом для миниатюрного изображения постера к фильму',
};

module.exports = {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  BAD_URL,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  VALIDATION_ERROR_NAME,
  ERROR_KIND_OBJECT_ID,
  FORBIDDEN_DELETE_MOVIE_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_AUTH_ERROR,
  NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD,
  MONGO_DB_ADDRESS,
  PORT_NUMBER,
  ALLOWED_CORS,
  USER_SCHEMA_REQUIRED_MESSAGES,
  USER_SCHEMA_VALIDATE_MESSAGES,
  MOVIE_SCHEMA_REQUIRED_MESSAGES,
  MOVIE_SCHEMA_VALIDATE_MESSAGES,
  REQUEST_LOG_FILENAME,
  ERROR_LOG_FILENAME,
};
