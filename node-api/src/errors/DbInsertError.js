class DbInsertError extends Error {
  constructor(table, data) {
    super(table, data);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    const message = 'Attempt to insert row to database failed';
    this.message = { message, table, data };
    this.status = 500;
  }
}

module.exports = DbInsertError;
