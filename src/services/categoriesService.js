const Joi = require('joi');
const models = require('../database/models');

const categoriesService = {
  async validateBodyCategory(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    await schema.validateAsync(data);
  },

  async add(data) {
    const result = await models.Category.create(data);
    return result.toJSON();
  },

  async getAll() {
    const categories = await models.Category.findAll();
    return categories;
  },
};

module.exports = categoriesService;