const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const { throwValidationError } = require('../middlewares/utils');

const secret = process.env.JWT_SECRET;
const options = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const authService = {
  async validateBodyLogin(data) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    });
    const result = await schema.validateAsync(data);
    return result;
  },

  async getByEmailAndPassword(email, password) {
    const result = await models.User.findOne({
      where: { email, password },
    });
    if (!result) {
      throwValidationError('Invalid fields');
    }
    return result;
  },

  async makeToken(user) {
    console.log(user);
    const { id, displayName } = user;
    const payload = { data: { id, displayName } };
    const token = jwt.sign(payload, secret, options);
    return token;
  },
  
  async readToken(token) {
    const { data } = jwt.verify(token, secret);
    return data;
  },
};

module.exports = authService;