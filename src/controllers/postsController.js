const { StatusCodes: HTTP } = require('http-status-codes');
const postsService = require('../services/postsService');

const postsController = {
  async add({ body }, res) {
    const post = await postsService.add(body);
    res.status(HTTP.OK).json(post);
  },

  async getAll(_req, res) {
    const posts = await postsService.getAll();
    res.status(HTTP.OK).json(posts);
  },

  async getById({ params: { id } }, res) {
    const post = await postsService.getById(id);
    if (!post) {
      res.status(HTTP.NOT_FOUND).json({ message: 'Post does not exist' });
    }
    res.status(HTTP.OK).json(post);
  },

  async edit(req, res) {
    await postsService.validateBodyPost(req.body);
    await postsService.validateUser(req.params.id, req.user.id);
    await postsService.edit(req.body, req.params.id);
    const post = await postsService.getById(req.params.id);
    res.status(HTTP.OK).json(post);
  },

  async delete(req, res) {
    await postsService.validatePost(req.params.id);
    await postsService.validateUser(req.params.id, req.user.id);
    await postsService.delete(req.params.id);
    res.status(HTTP.NO_CONTENT).end();
  },

  async search({ query: { q } }, res) {
    let query = await postsService.search(q);
    if (!query) query = [];
    if (q.length === 0) query = await postsService.getAll();
    res.status(HTTP.OK).json(query);
  },
};

module.exports = postsController;