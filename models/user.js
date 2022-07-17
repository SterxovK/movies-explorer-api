const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isLength = require('validator/lib/isLength');
const isStrongPassword = require('validator/lib/isStrongPassword');

const bcrypt = require('bcryptjs');

const AuthError = require('../Error/AuthError');

const SCHEMA_USER_VALIDATE_MESSAGES = require('../utils/constants');
const AUTH_ERROR_MASSAGE = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Константин',
    required: true,
    validate: {
      validator(v) {
        return isLength(v, { min: 2, max: 30 });
      },
      massage: (props) => `${props.value} ${SCHEMA_USER_VALIDATE_MESSAGES.NAME}`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      massage: (props) => `${props.value} ${SCHEMA_USER_VALIDATE_MESSAGES.EMAIL}`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return isStrongPassword(v);
      },
      massage: () => SCHEMA_USER_VALIDATE_MESSAGES.PASSWORD,
    },
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(AUTH_ERROR_MASSAGE));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError(AUTH_ERROR_MASSAGE));
        }

        return user;
      });
    });
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;