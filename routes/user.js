const routerUsers = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const { getUserMe, updateUserProfile } = require('../controllers/user');

routerUsers.get('/users/me', getUserMe);

routerUsers.patch('/users/:me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
  }),
}), updateUserProfile);

routerUsers.use(errors());

module.exports = routerUsers;
