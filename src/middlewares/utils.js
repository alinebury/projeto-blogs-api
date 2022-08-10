const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  throw error;
};

const throwValidationError = (message) => {
  const error = new Error(message);
  error.name = 'ValidationError';
  throw error;
};

const throwConflictionError = (message) => {
  const error = new Error(message);
  error.name = 'ConflictError';
  throw error;
};

const throwUnauthorizedError = (message) => {
  const error = new Error(message);
  error.name = 'UnauthorizedError';
  throw error;
};

module.exports = {
  throwNotFoundError,
  throwValidationError,
  throwConflictionError,
  throwUnauthorizedError,
}; 