const categoriesService = require('../services/categoriesService');

const categoriesController = {
  async add({ body }, res) {
    await categoriesService.validateBodyCategory(body);
    const category = await categoriesService.add(body);
    res.status(201).json(category);
  },

  async getAll(_req, res) {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  },
};

module.exports = categoriesController;