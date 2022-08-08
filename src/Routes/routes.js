const { Router } = require('express');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');
const categoriesController = require('../controllers/categoriesController');
const postsController = require('../controllers/postsController');
const validateJWT = require('../middlewares/validateJWT');

const routes = Router();

// Endpoint Login
routes.post('/login', authController.login);

// Endpoint User
routes.post('/user', usersController.add);
routes.get('/user', validateJWT, usersController.getAll);
routes.get('/user/:id', validateJWT, usersController.getById);

// Endpoint Categories
routes.post('/categories', validateJWT, categoriesController.add);
routes.get('/categories', validateJWT, categoriesController.getAll);

// Endpoint POSTS
routes.get('/post', validateJWT, postsController.getAll);

module.exports = routes;