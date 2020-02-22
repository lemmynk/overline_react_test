/* eslint class-methods-use-this: ["error", { "exceptMethods": ["excludeAlways"] }] */
const Model = require('./Model');
const { decoder, tokenizer } = require('../utils');
const { UnauthorizedUserError } = require('../errors');

const modelConfig = {
  tableName: 'users',
  keys: [
    'id',
    'uuid',
    'username',
    'password',
    'firstName',
    'lastName',
    'email',
    'role',
    'refreshToken',
    'loginAttempts',
    'loginAttemptAt',
    'deletedAt',
    'createdAt',
    'updatedAt',
  ],
};

class User extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  static authenticate(username, password) {
    return this.find({ username })
      .catch(() => {
        throw new UnauthorizedUserError('Invalid username');
      })
      .then(user => {
        return decoder.compare(password, user.password).then(match => {
          if (match) return user;
          throw new UnauthorizedUserError('Invalid password');
        });
      });
  }

  generateTokenPayload(expiresIn) {
    const sub = decoder.encryptSync(this.uuid);
    const claims = { sub };
    const token = decoder.uuid();
    const refreshToken = decoder.encryptSync(token);

    this.refreshToken = token;
    console.log(this);

    return this.save()
      .then(() => tokenizer.generateToken(claims, expiresIn))
      .then(payload => ({ ...payload, refreshToken }));
  }

  /**
   * Transform to whoAmI request response
   * @return {Object}
   */
  toWhoAmI() {
    return this.attributes(['uuid', 'refreshToken', 'createdAt', 'updatedAt']);
  }

  /**
   * List of attributes to be excluded always from output
   *
   * @return {Array}
   */
  excludeAlways() {
    return [...Model.timestamps, ...User.exclude];
  }

  /**
   * Validate params provided
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate(params) {
    this.clearValidationErrors()
      .validateRequired(
        ['uuid', 'username', 'firstName', 'lastName', 'email'],
        params,
      )
      .validateStringLength(params, 'uuid', 36)
      .validateStringLength(params, 'username', 120)
      // .validateStringLength(params, 'password', 120)
      .validateStringLength(params, 'firstName', 120)
      .validateStringLength(params, 'lastName', 120)
      .validateStringLength(params, 'email', 120);
    return Object.keys(this.validationErrors).length === 0;
  }
}

User.exclude = ['password', 'refreshToken'];

module.exports = User;
