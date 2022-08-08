const jwt = require('jsonwebtoken');

const models = require('../database/models');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await models.User.findOne({ where: { displayName: decoded.data.displayName } });
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token', error: err.message });
  }
};