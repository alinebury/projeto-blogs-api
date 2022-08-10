const jwt = require('jsonwebtoken');
const { StatusCodes: HTTP } = require('http-status-codes');

const models = require('../database/models');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HTTP.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await models.User.findOne({
      raw: true,
      where: { displayName: decoded.data.displayName },
    });
    req.user = user;

    next();
  } catch (err) {
    return res.status(HTTP.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};