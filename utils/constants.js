const SCHEMA_MOVIE_VALIDATE_MESSAGES = {
  IMAGE: 'не URL для постера к фильму',
  TRAILER: 'не URL для трейлера к фильму',
  THUMBNAIL: 'не URL для минипостера к фильму',
};

const SCHEMA_USER_VALIDATE_MESSAGES = {
  EMAIL: 'не является EMAIL',
};

const AUTH_ERROR_MASSAGE = 'Неправильные почта или пароль';

module.exports = {
  SCHEMA_MOVIE_VALIDATE_MESSAGES,
  SCHEMA_USER_VALIDATE_MESSAGES,
  AUTH_ERROR_MASSAGE,
};
