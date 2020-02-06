class DbUpdateError extends Error {
  constructor(table, data, id) {
    super(table, data, id);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    const message = 'Attempt to update row in database failed';
    this.message = { message, table, data, id };
    this.status = 500;
  }
}

module.exports = DbUpdateError;
