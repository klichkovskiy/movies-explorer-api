const routerMovies = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const { getMovies, postMovies, deleteMovies } = require('../controllers/movies');

routerMovies.get('/movies', getMovies);

routerMovies.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?([\w\W]+\.\w{2,}([\w\W]+)?#?)/i),
    trailer: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?([\w\W]+\.\w{2,}([\w\W]+)?#?)/i),
    nameRU: Joi.string().required().pattern(/^([А-Яа-я0-9-.,ё]+\s?)+$/),
    nameEN: Joi.string().required().pattern(/^([A-Za-z0-9-.,]+\s?)+$/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?([\w\W]+\.\w{2,}([\w\W]+)?#?)/i),
    movieId: Joi.number().required(),
  }),
}), postMovies);

routerMovies.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovies);

routerMovies.use(errors());

module.exports = routerMovies;
