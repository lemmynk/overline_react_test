class NoRecordsFoundError extends Error {
  constructor(table, attrs) {
    super(table, attrs);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    const message = 'Attempt to locate records in database failed';
    this.message = { message, table, attrs };
    this.status = 404;
  }
}

module.exports = NoRecordsFoundError;
