const queryString = require('query-string');
const User = require('../../models/User');
const AuthFlow = require('../../models/AuthFlow');
const { env, decoder } = require('../../utils');
const { UnauthorizedUserError } = require('../../errors');

/**
 * Render Login form
 */
const renderLoginForm = (req, res, errors) => {
  const { authUrl } = req.urls;
  const action = `${authUrl}/login`;
  const creds = env.devCredentials();
  res.render('signin', { action, errors, ...creds });
};

/**
 * Handle Login form submition
 */
const handleLoginFormSubmit = (req, res, next) => {
  const { username, password } = req.body;

  User.authenticate(username, password)
    .then(user => {
      const authCode = decoder.uuid();
      const handshakeCode = decoder.uuid();
      const userUuid = user.uuid;
      return AuthFlow.create({ authCode, handshakeCode, userUuid });
    })
    .then(flow => decoder.encrypt(flow.handshakeCode))
    .then(code => {
      const redirectUrl = process.env.REDIRECT_URL;
      const query = queryString.stringify({ code });

      const url = `${redirectUrl}#${query}`;
      return res.redirect(url);
    })
    .catch(err => {
      if (err instanceof UnauthorizedUserError) {
        renderLoginForm(req, res, [err.message]);
      } else {
        next(err);
      }
    });
};

module.exports = {
  renderLoginForm,
  handleLoginFormSubmit,
};
