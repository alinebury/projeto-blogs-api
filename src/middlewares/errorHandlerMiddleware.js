const { StatusCodes: HTTP } = require('http-status-codes');

const errors = {
  ValidationError: HTTP.BAD_REQUEST,
  UnauthorizedError: HTTP.UNAUTHORIZED,
  NotFoundError: HTTP.NOT_FOUND,
  ConflictError: HTTP.CONFLICT,
};

/**
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const errorHandlerMiddleware = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  console.log(name, message);
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;