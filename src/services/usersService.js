const Joi = require('joi');
const bcrypt = require('bcrypt');
const models = require('../database/models');
const { throwConflictionError, throwNotFoundError } = require('../middlewares/utils');

const usersService = {
  async validateBodyAdd(data) {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      image: Joi.string(),
    });
    const result = await schema.validateAsync(data);
    return result;
  },

  async validateEmail(email) {
    const result = await models.User.findOne({
      where: { email },
    });
    if (result) {
      throwConflictionError('User already registered');
    }
  },

  async add(data) {
    const modelWithHashedPassword = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    };
    const model = await models.User.create(modelWithHashedPassword);
    const newUser = model.toJSON();
    const { password, ...user } = newUser;
    return user;
  },

  async getAll() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
      raw: true,
    });
    return users;
  },

  async getById(id) {
    const user = await models.User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throwNotFoundError('User does not exist');
    }
    return user;
  },
};

module.exports = usersService;