const AuthError = function (name, message, error) {
  Error.call(message);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }

  this.name = name;
  this.message = message;
  if (error) this.inner = error;
};

AuthError.prototype = Object.create(Error.prototype);
AuthError.prototype.constructor = AuthError;

const ValidatorError = function (name, message, error) {
  Error.call(message);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }

  this.name = name;
  this.message = message;
  if (error) this.inner = error;
};

ValidatorError.prototype = Object.create(Error.prototype);
ValidatorError.prototype.constructor = ValidatorError;

module.exports = { AuthError, ValidatorError };
