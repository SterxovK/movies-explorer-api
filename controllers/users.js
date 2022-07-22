const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../Error/NotFoundError');
const CastError = require('../Error/CastError');
const ConflictEmailError = require('../Error/ConflictEmailError');
const NotValidError = require('../Error/NotFoundError');
const AuthError = require('../Error/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  VALIDATION_ERROR_NAME,
  USER_NOT_FOUND_MESSAGE,
  CAST_ERROR_NAME,
  CAST_ERROR_MESSAGE,
  CONFLICT_EMAIL_ERROR,
} = require('../utils/constants');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
        {
          expiresIn: '7d',
        },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send(`${user.name} авторизован`);
    })
    .catch(() => {
      throw new AuthError(USER_NOT_FOUND_MESSAGE);
    })
    .catch(next);
};

const getUserCurrent = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === CAST_ERROR_NAME) {
        next(new CastError(CAST_ERROR_MESSAGE));
      } else {
        next(error);
      }
    });
};

const createUser = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
      name,
    });
    res.status(201).send({
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictEmailError(CONFLICT_EMAIL_ERROR));
    } else {
      next(err);
    }
  }
};

const updateUserCurrent = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === VALIDATION_ERROR_NAME) {
        next(new NotValidError(error.message));
      } else {
        next(new ConflictEmailError(CONFLICT_EMAIL_ERROR));
      }
      next(error);
    });
};

module.exports = {
  login,
  getUserCurrent,
  createUser,
  updateUserCurrent,
};
