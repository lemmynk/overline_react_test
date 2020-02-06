class ValidationError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || this.name;
    this.status = 422;
  }
}

module.exports = ValidationError;
