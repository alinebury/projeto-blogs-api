const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  throw error;
};

const throwBadRequestError = (message) => {
  const error = new Error(message);
  error.name = 'BadRequest';
  throw error;
};

const throwUnprocessableEntity = (message) => {
  const error = new Error(message);
  error.name = 'Unprocessable Entity';
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

module.exports = {
  throwNotFoundError,
  throwBadRequestError,
  throwUnprocessableEntity,
  throwValidationError,
  throwConflictionError,
}; 