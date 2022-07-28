const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRoutes = new Router();

usersRoutes.post('/login', usersController.add);

module.exports = usersRoutes;
