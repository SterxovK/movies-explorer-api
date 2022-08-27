const Movie = require('../models/movie');
const NotFoundError = require('../Error/NotFoundError');
const ForbiddenError = require('../Error/ForbiddenError');
const NotValidError = require('../Error/NotFoundError');

const {
  MOVIE_NOT_FOUND_MESSAGE,
  VALIDATION_ERROR_NAME,
  FORBIDDEN_ERROR_MESSAGE,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => {
      // нужно было отправлять массив
      res.status(200).send(cards);
    })
    .catch(next);
};

const createMovie = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movie = await Movie.create({ owner, ...req.body });
    res.status(201).send({ data: movie });
  } catch (error) {
    if (error.name === VALIDATION_ERROR_NAME) {
      next(new NotValidError(error.message));
    } else {
      next(error);
    }
  }
};

// DELETE
const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      } else {
        Movie.findByIdAndDelete(movieId)
          .then((deletedMovie) => {
            res.status(200).send({ data: deletedMovie });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
