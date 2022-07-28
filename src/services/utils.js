const throwNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

const throwUnauthorizedError = (message = 'Não autorizado') => {
  const err = new Error(message);
  err.name = 'UnauthorizedError';
  throw err;
};

module.exports = {
  throwNotFoundError,
  throwUnauthorizedError,
};