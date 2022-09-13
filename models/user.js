const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isStrongPassword = require('validator/lib/isStrongPassword');
const isLength = require('validator/lib/isLength');

const bcrypt = require('bcryptjs');

const NotAuthError = require('../errors/NotAuthError');

const {
  NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD,
  USER_SCHEMA_REQUIRED_MESSAGES,
  USER_SCHEMA_VALIDATE_MESSAGES,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, USER_SCHEMA_REQUIRED_MESSAGES.EMAIL],
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: (props) => `${props.value} ${USER_SCHEMA_VALIDATE_MESSAGES.EMAIL}`,
    },
  },
  password: {
    type: String,
    required: [true, USER_SCHEMA_REQUIRED_MESSAGES.PASSWORD],
    validate: {
      validator(v) {
        return isStrongPassword(v);
      },
      message: () => USER_SCHEMA_VALIDATE_MESSAGES.PASSWORD,
    },
    select: false,
  },
  name: {
    type: String,
    required: [true, USER_SCHEMA_REQUIRED_MESSAGES.NAME],
    validate: {
      validator(v) {
        return isLength(v, { min: 2, max: 30 });
      },
      message: (props) => `${props.value} ${USER_SCHEMA_VALIDATE_MESSAGES.NAME}`,
    },
  },
});

userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthError(NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuthError(NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
