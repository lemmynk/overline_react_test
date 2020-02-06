const jwt = require('jsonwebtoken');
// const { TokenExpiredError } = require('jsonwebtoken');
const { AuthenticationError, AuthTokenExpiredError } = require('../errors');

const self = {
  /**
   * generate Jwt token for claims provided
   *
   * @param  {Object} payload
   * @param  {Number} expiresIn
   * @return {Promise}
   */
  generateToken: (payload, jwtExpiresIn) => {
    const expiresIn = parseInt(
      jwtExpiresIn || process.env.JWT_EXPIRES_IN_AUTH,
      0,
    );
    const secret = Buffer.from(process.env.JWT_SECRET, 'base64');
    const options = {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn,
      issuer: process.env.JWT_ISSUER,
    };

    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, accessToken) => {
        if (err) reject(err);
        else resolve({ accessToken, expiresIn });
      });
    });
  },

  stripBearer: (bearerToken = null) => {
    if (!bearerToken) return null;

    // Check prefix match
    const prefix = `${process.env.JWT_PREFIX.toLowerCase()} `;
    const authPrefix = bearerToken.substring(0, prefix.length).toLowerCase();

    if (authPrefix !== prefix) return null;

    return bearerToken.substr(prefix.length).replace(' ', '');
  },

  /**
   * Decode token even if it's expired
   * Will return Jwt Object ({ headers: ... payload: ...})
   *
   * @param  {String} token
   * @return {Object| null}
   */
  decode: token => {
    return jwt.decode(token, { complete: true });
  },

  /**
   * Verify token provided
   *
   * @param  {String} token
   * @return {Promise}
   */
  decodeToken: token => {
    const secret = Buffer.from(process.env.JWT_SECRET, 'base64');
    const options = {
      algorithms: [process.env.JWT_ALGORITHM],
      issuer: process.env.JWT_ISSUER,
      ignoreNotBefore: true,
    };

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) {
          reject(err);
        } else resolve(decoded);
      });
    });
  },

  validate: req => {
    const { authorization } = req.headers;

    // Check header exists
    if (!authorization)
      throw new AuthenticationError('No Authorization token provided');

    // Check prefix match
    const prefix = `${process.env.JWT_PREFIX.toLowerCase()} `;
    const authPrefix = authorization.substring(0, prefix.length).toLowerCase();
    if (authPrefix !== prefix)
      throw new AuthenticationError(
        'Invalid Authorization token prefix provided',
      );

    // Check token exists
    const token = authorization.substr(prefix.length).replace(' ', '');

    if (token.length === 0)
      throw new AuthenticationError(
        'Invalid Authorization token body provided',
      );

    // Decode token
    return self.decodeToken(token).catch(err => {
      if (err instanceof jwt.TokenExpiredError)
        throw new AuthTokenExpiredError(`${err.name} - ${err.message}`);

      // if (err instanceof JsonWebTokenError)
      throw new AuthenticationError(`${err.name} - ${err.message}`);
    });
    // .catch(err => next(err))
  },
};

module.exports = self;
