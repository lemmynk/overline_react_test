const apiErrorHandler = require('./apiErrorHandler');
const AuthenticationError = require('./AuthenticationError');
const AuthTokenExpiredError = require('./AuthTokenExpiredError');
const UnauthorizedUserError = require('./UnauthorizedUserError');
const ValidationError = require('./ValidationError');
const DbError = require('./DbError');
const NoRecordsFoundError = require('./NoRecordsFoundError');
const DbInsertError = require('./DbInsertError');
const DbUpdateError = require('./DbUpdateError');

module.exports = {
  apiErrorHandler,

  AuthenticationError,
  AuthTokenExpiredError,
  UnauthorizedUserError,

  ValidationError,

  DbError,
  NoRecordsFoundError,
  DbInsertError,
  DbUpdateError,
};
/*
export { default as AuthenticationError } from './AuthenticationError';
export { default as AuthTokenExpiredError } from './AuthTokenExpiredError';
export { default as UnauthorizedUserError } from './UnauthorizedUserError';

export { default as ValidationError } from './ValidationError';

export { default as DbError } from './DbError';
export { default as NoRecordsFoundError } from './NoRecordsFoundError';
export { default as DbInsertError } from './DbInsertError';
export { default as DbUpdateError } from './DbUpdateError';

export { default as apiErrorHandler } from './apiErrorHandler';
*/
