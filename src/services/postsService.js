const Joi = require('joi');
const { Op } = require('sequelize');
const models = require('../database/models');
const { throwUnauthorizedError, throwNotFoundError } = require('../middlewares/utils');

const postsService = {
  async validateUser(id, userId) {
    const result = await models.BlogPost.findOne({
      raw: true,
      where: { id },
      attributes: ['userId'],
    });
    if (result !== userId) {
      throwUnauthorizedError('Unauthorized user');
    }
  },

  async validateBodyPost(data) {
    const schema = Joi.object({
      title: Joi.string().required().max(255),
      content: Joi.string().required().max(255),
    }).messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    });
    await schema.validateAsync(data);
  },

  async validatePost(id) {
    const post = await models.BlogPost.findOne({
      where: { id },
    });
    if (!post) throwNotFoundError('Post does not exist');
  },

  async add(data) {
    const post = await models.BlogPost.create(data);
    return post;
  },

  async getAll() {
    const posts = await models.BlogPost.findAll({
      include:
      [
        {
          model: models.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { 
          model: models.Category,
          as: 'categories',
          through: { attributes: { exclude: ['postId', 'categoryId'] } },
        },
      ],
      attributes: { exclude: ['UserId'] },
    });
    return posts;
  },

  async getById(id) {
    const post = await models.BlogPost.findOne({
      where: { id },
      include:
      [
        {
          model: models.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { 
          model: models.Category,
          as: 'categories',
          through: { attributes: { exclude: ['postId', 'categoryId'] } },
        },
      ],
      attributes: { exclude: ['UserId'] },
    });
    return post;
  },

  async edit(data, id) {
    await models.BlogPost.update(
      { 
        title: data.title,
        content: data.content,
      },
      { 
        where: { id },
      },
    );
  },

  async delete(id) {
    await models.PostCategory.destroy({
      where: { postId: id },
    });
    await models.BlogPost.destroy({
      where: { id },
    });
  },

  async search(q) {
    const query = await models.BlogPost.findOne({
      where: { [Op.or]: {
          title: { [Op.like]: `%${q}%` },
          content: { [Op.like]: `%${q}%` } },
      },
      include: [{
          model: models.User,
          as: 'user',
          attributes: { exclude: ['password'] },
        }, { 
          model: models.Category,
          as: 'categories',
          through: { attributes: { exclude: ['postId', 'categoryId'] } },
        },
      ],
      attributes: { exclude: ['UserId'] },
    });
    return query;
  },
};

module.exports = postsService;