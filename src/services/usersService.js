const Joi = require('joi');
const bcrypt = require('bcrypt');
const models = require('../database/models');
// const { throwNotFoundError, throwUnauthorizedError } = require('./utils');

const usersService = {
  async validateBodyAdd(unknown) {
    const schema = Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().max(255),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  },

  async add(data) {
    const modelWithHashedPassword = {
      ...data,
      password: bcrypt.hash(data.password, 10),
    };
    const model = await models.user.create(modelWithHashedPassword);
    const newUser = model.toJSON();
    const { password, ...user } = newUser;
    return user;
  },
};

module.exports = usersService;