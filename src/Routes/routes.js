const { Router } = require('express');
const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');
const categoriesController = require('../controllers/categoriesController');
const validateJWT = require('../middlewares/validateJWT');
const postsController = require('../controllers/postsController');

const routes = Router();

// Endpoint Login
routes.post('/login', authController.login);

// Endpoint User
routes.post('/user', usersController.add);
routes.get('/user', validateJWT, usersController.getAll);
routes.get('/user/:id', validateJWT, usersController.getById);
routes.delete('/user/me', validateJWT, usersController.deleteById);

// Endpoint Categories
routes.post('/categories', validateJWT, categoriesController.add);
routes.get('/categories', validateJWT, categoriesController.getAll);

// Endpoint POSTS
routes.get('/post/search', validateJWT, postsController.search);
routes.post('/post', validateJWT, postsController.add);
routes.get('/post', validateJWT, postsController.getAll);
routes.get('/post/:id', validateJWT, postsController.getById);
routes.put('/post/:id', validateJWT, postsController.edit);
routes.delete('/post/:id', validateJWT, postsController.delete);

module.exports = routes;