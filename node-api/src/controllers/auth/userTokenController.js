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

  token: (req, res, next) => {
    const { verifier, code } = req.body;

    decoder
      .decrypt(code)
      .then(authCode => AuthFlow.find({ authCode }))
      .then(flow => flow.verifyChallenge(verifier))
      .then(flow => User.find({ uuid: flow.userUuid }))
      .then(user => user.generateTokenPayload())
      .then(payload => res.json(payload))
      .catch(err => next(err));
  },

  renew: (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ValidationError(['Invalid request']);
    }

    decoder
      .decrypt(refreshToken)
      .then(token => User.find({ refreshToken: token }))
      .then(user => {
        const newRefreshToken = decoder.uuid();
        user.refreshToken = newRefreshToken;
        return user.save().then(() => user);
      })
      .then(user => user.generateTokenPayload())
      .then(payload => res.json(payload))
      .catch(err => next(err));
  },
};

module.exports = self;
