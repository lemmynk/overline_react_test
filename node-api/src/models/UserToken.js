const { decoder, tokenizer } = require('../utils');
const Model = require('./Model');

const modelConfig = {
  tableName: 'user_tokens',
  keys: [
    'id',
    'userUuid',
    'refreshToken',
    'expiresAt',
    'deletedAt',
    'createdAt',
    'updatedAt',
  ],
};

class UserToken extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  /**
   * Generate Auth payload
   *
   * - create new UserToken, decode refreshToken
   * - generate jwtPayload
   * - combine jwtPayload with refreshToken
   */
  static generateTokenPayload(userUuid, jwtExpiresIn) {
    const now = parseInt(new Date().getTime() / 1000, 0);
    const expiresIn = parseInt(
      jwtExpiresIn || process.env.JWT_EXPIRES_IN_AUTH,
      0,
    );
    const token = decoder.uuid();
    const expiresAt = now + expiresIn;

    return Promise.all([
      UserToken.create({ userUuid, refreshToken: token, expiresAt }),
      decoder.encrypt(userUuid),
    ])
      .then(([userToken, sub]) =>
        Promise.all([
          decoder.encrypt(userToken.refreshToken),
          tokenizer.generateToken({ sub }, expiresIn),
        ]),
      )
      .then(([refreshToken, payload]) => ({
        ...payload,
        refreshToken,
      }));
  }

  /**
   * Will renew RefreshToken
   *
   * - create new tokenm update UserToken
   * - generate jwtPayload
   * - combine jwtPayload with refreshToken
   */
  static renewToken(token, jwtExpiresIn) {
    const now = parseInt(new Date().getTime() / 1000, 0);
    const expiresIn = parseInt(
      jwtExpiresIn || process.env.JWT_EXPIRES_IN_AUTH,
      0,
    );
    const expiresAt = now + expiresIn;
    const newToken = decoder.uuid();

    return decoder
      .decrypt(token)
      .then(refreshToken => UserToken.find({ refreshToken }))
      .then(userToken =>
        Promise.all([
          userToken.fill({ refreshToken: newToken, expiresAt }),
          decoder.encrypt(userToken.userUuid),
        ]),
      )
      .then(([userToken, sub]) =>
        Promise.all([
          decoder.encrypt(userToken.refreshToken),
          tokenizer.generateToken({ sub }, expiresIn),
          userToken.save(),
        ]),
      )
      .then(([refreshToken, payload]) => ({
        ...payload,
        refreshToken,
      }));
  }
}

module.exports = UserToken;
