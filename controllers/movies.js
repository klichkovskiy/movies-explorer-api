const Movie = require('../models/movies');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      next(err);
    });
};

module.exports.postMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner = req.user._id,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.movieId)
    .orFail(new Error('NotFound'))
    .then((movies) => {
      if (userId !== movies.owner.toString()) {
        throw new ForbiddenError('Невозможно удалить фильм другого пользователя.');
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((movieRemove) => {
          res.send({ data: movieRemove });
        });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Фильм с указанным _id не найдена.'));
      } if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};
