const authService = require('../services/authService');
// const usersService = require('../services/usersService');

const authController = {
  /** @type {import('express').RequestHandler} */
  async login({ body }, res) {
    const { email, password } = await authService.validateBodyLogin(body);
    const user = await authService.getByEmailAndPassword(email, password);
    const token = await authService.makeToken(user);
    res.json({ token });
  },
};

module.exports = authController;