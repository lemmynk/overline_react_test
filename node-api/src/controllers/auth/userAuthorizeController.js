/* eslint no-param-reassign: ["error", { "props": false }] */
/*
 |----------------------------------------------------------
 | USER AUTHORIZE CONTROLLER
 |----------------------------------------------------------
 | Controller responsible for user authorization 
 |  - handle challenge initialization
 */
const { decoder } = require('../../utils');
const { ValidationError } = require('../../errors');
const AuthFlow = require('../../models/AuthFlow');

const self = {
  redirectToLogin: (req, res) => {
    const { authUrl } = req.urls;
    res.redirect(`${authUrl}/login`);
  },

  middleware: (req, res, next) => {
    const { code, challenge } = req.body;
    const errors = [];
    if (!code) errors.push('code param missing');
    if (!challenge) errors.push('challenge param missing');
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    next();
  },

  authorize: (req, res, next) => {
    const { code, challenge } = req.body;

    decoder
      .decrypt(code)
      .then(handshakeCode => AuthFlow.find({ handshakeCode }))
      .then(flow => {
        flow.challengeCode = challenge;
        return flow.save().then(() => flow);
      })
      .then(flow => decoder.encrypt(flow.authCode))
      .then(authCode => res.status(201).json({ code: authCode }))
      .catch(err => next(err));
  },
};

module.exports = self;
