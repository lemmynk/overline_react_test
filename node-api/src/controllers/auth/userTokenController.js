/* eslint no-param-reassign: ["error", { "props": false }] */
/*
 |----------------------------------------------------------
 | USER TOKEN CONTROLLER
 |----------------------------------------------------------
 | Controller responsible for user token handling 
 |  - handle challenge verification
 |  - handle token renew
 */
const { decoder } = require('../../utils');
const { ValidationError } = require('../../errors');
const AuthFlow = require('../../models/AuthFlow');
const User = require('../../models/User');
const UserToken = require('../../models/UserToken');

const expiresAt = (expiresIn = 0) =>
  parseInt(new Date().getTime() / 1000, 0) + expiresIn;

const self = {
  middleware: (req, res, next) => {
    const { code, verifier } = req.body;
    const errors = [];
    // code and codeVerified should be sent
    if (!code) errors.push('code param missing');
    if (!verifier) errors.push('verifier param missing');
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    next();
  },

  /**
   * Generate new UserToken and return Auth payload
   */
  token: (req, res, next) => {
    const { verifier, code } = req.body;

    decoder
      .decrypt(code)
      .then(authCode => AuthFlow.find({ authCode }))
      .then(flow => flow.verifyChallenge(verifier))
      .then(flow => UserToken.generateTokenPayload(flow.userUuid))
      .then(payload => res.json(payload))
      .catch(err => next(err));
  },

  /**
   * Renew existing RefreshToken
   */
  renew: (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ValidationError(['Invalid request']);
    }

    UserToken.renewToken(refreshToken)
      .then(payload => res.json(payload))
      .catch(err => next(err));
  },

  /**
   * Create new Auth payload for dev
   */
  devToken: (req, res, next) => {
    const { body } = req;
    const { username: userName, expiresIn } = body;

    User.find({ userName })
      .then(user => UserToken.generateTokenPayload(user.uuid, expiresIn))
      .then(response => ({
        ...response,
        exiresAt: expiresAt(response.expiresIn),
        now: parseInt(new Date().getTime() / 1000, 0),
      }))
      .then(payload => res.json(payload))
      .catch(err => next(err));
  },
};

module.exports = self;
