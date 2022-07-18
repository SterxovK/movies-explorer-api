const jwt = require('jsonwebtoken');
const AuthError = require('../Error/AuthError');

const NOT_AUTH_ERROR_MESSAGE = require('../utils/constants');

const auth = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!token) {
    throw new AuthError(NOT_AUTH_ERROR_MESSAGE);
  }
  let payload;
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
