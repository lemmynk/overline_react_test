/**
 * Check is environment Production
 */
const isProduction = () => process.env.ENVIRONMENT === 'production';

/**
 * Return dev user credentials
 * Save some typing
 */
const devCredentials = () =>
  isProduction()
    ? {}
    : {
        username: process.env.DEV_USERNAME,
        password: process.env.DEV_PASSWORD,
      };

/**
 * Check is logged user is developer
 */
const isDeveloper = req => {
  if (!req) {
    throw new Error('isDeveloper:: Request parameter missing');
  }
  return (
    req.auth &&
    req.auth.role &&
    req.auth.role === process.env.AUTH_USER_ROLE_DEVELOPER
  );
};

/**
 * Resolve default db pagination
 */
const defaultPerPage = () => parseInt(process.env.DB_PAGINATION, 10);

/**
 * JWT token saltRounds value
 * Add checking for NaN
 */
const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS, 0);

/**
 * Scryptify secret
 */
const scryptifySecret = process.env.SCRYPTIFY_SECRET;

module.exports = {
  isProduction,
  isDeveloper,
  devCredentials,
  defaultPerPage,
  saltRounds,
  scryptifySecret,
};
