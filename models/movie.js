const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const {
  MOVIE_SCHEMA_REQUIRED_MESSAGES,
  MOVIE_SCHEMA_VALIDATE_MESSAGES,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.COUNTRY],
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DURATION],
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.YEAR],
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DESCRIPTION],
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.NAME_RU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.NAME_EN],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.IMAGE],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_VALIDATE_MESSAGES.IMAGE}`,
    },
  },
  trailer: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.TRAILER],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_VALIDATE_MESSAGES.TRAILER}`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.THUMBNAIL],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_VALIDATE_MESSAGES.THUMBNAIL}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.OWNER],
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.MOVIE_ID],
  },
});

module.exports = mongoose.model('movie', movieSchema);
