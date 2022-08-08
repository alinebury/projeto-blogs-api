const usersService = require('../services/usersService');
const authService = require('../services/authService');

const usersController = {
  async add({ body }, res) {
    // Validação do body
    await usersService.validateBodyAdd(body);
    // Validação email existente
    await usersService.validateEmail(body.email);
    // Adiciona usuario novo
    const user = await usersService.add(body);
    // Token gerado
    const token = await authService.makeToken(user);
    res.status(201).json({ token });
  },

  async getAll(_req, res) {
    const users = await usersService.getAll();
    res.status(200).json(users);
  },

  async getById({ params: { id } }, res) {
    const user = await usersService.getById(id);
    res.status(200).json(user);
  }, 
};

module.exports = usersController;
