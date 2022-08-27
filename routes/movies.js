const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

const { REGEX, NOT_VALIDATION_URL } = require('../utils/constants');

const validUrl = (value, helpers) => {
  if (REGEX.test(value)) {
    return value;
  }
  return helpers.message(NOT_VALIDATION_URL);
};

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(1).max(100),
      director: Joi.string().required().min(1).max(100),
      duration: Joi.number().required(),
      year: Joi.string().required().min(2).max(4),
      description: Joi.string().required().min(1).max(5000),
      nameRU: Joi.string().required().min(1).max(100),
      nameEN: Joi.string().required().min(1).max(100),
      image: Joi.string().required().custom(validUrl),
      trailer: Joi.string().required().custom(validUrl),
      thumbnail: Joi.string().required().custom(validUrl),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24)
        .hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
