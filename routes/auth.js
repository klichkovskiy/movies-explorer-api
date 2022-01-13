const routerAuth = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const { login, createUser } = require('../controllers/auth');

routerAuth.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), createUser);
routerAuth.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routerAuth.use(errors());

module.exports = routerAuth;
