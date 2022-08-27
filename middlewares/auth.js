const jwt = require('jsonwebtoken');
const AuthError = require('../Error/AuthError');

const { NOT_AUTH_ERROR_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(NOT_AUTH_ERROR_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  // const { cookies } = req;
  // const token = cookies.jwt;
  // const { NODE_ENV, JWT_SECRET } = process.env;
  // if (!token) {
  //   throw new AuthError(NOT_AUTH_ERROR_MESSAGE);
  // }
  // let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
    );
  } catch (err) {
    next(new AuthError(NOT_AUTH_ERROR_MESSAGE));
  }
  req.user = payload;
  next();
  return true;
};

module.exports = auth;
