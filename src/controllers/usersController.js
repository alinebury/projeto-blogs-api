const usersService = require('../services/usersService');

const usersController = {
  /** @type {import('express').RequestHandler} */
  async add({ body }, res) {
    const data = await usersService.validateBodyAdd(body);
    const user = await usersService.add(data);
    res.status(201).json(user);
  },
};

module.exports = usersController;
