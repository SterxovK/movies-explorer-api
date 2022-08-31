const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserCurrent,
  updateUserCurrent,
} = require('../controllers/users');

router.get('/me', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserCurrent);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUserCurrent,
);

module.exports = router;
