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

module.exports = {
  SCHEMA_MOVIE_VALIDATE_MESSAGES,
  SCHEMA_USER_VALIDATE_MESSAGES,
  AUTH_ERROR_MASSAGE,
};
