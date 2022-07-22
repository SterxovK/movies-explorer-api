const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isLength = require('validator/lib/isLength');
const isStrongPassword = require('validator/lib/isStrongPassword');

const bcrypt = require('bcryptjs');

const AuthError = require('../Error/AuthError');

const {
  SCHEMA_USER_VALIDATE_MESSAGES,
  AUTH_ERROR_MESSAGE,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: (props) => `${props.value} ${SCHEMA_USER_VALIDATE_MESSAGES.EMAIL}`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return isStrongPassword(v);
      },
      message: () => SCHEMA_USER_VALIDATE_MESSAGES.PASSWORD,
    },
    select: false,
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return isLength(v, { min: 2, max: 30 });
      },
      message: (props) => `${props.value} ${SCHEMA_USER_VALIDATE_MESSAGES.NAME}`,
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(AUTH_ERROR_MESSAGE));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError(AUTH_ERROR_MESSAGE));
        }

        return user;
      });
    });
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
