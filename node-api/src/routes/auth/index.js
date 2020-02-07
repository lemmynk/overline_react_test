const express = require('express');
const middleware = require('../middleware');
const loginCtrl = require('../../controllers/auth/userLoginController');
const authCtrl = require('../../controllers/auth/userAuthorizeController');
const tokenCtrl = require('../../controllers/auth/userTokenController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('AUTH');
});

/**
 * 1. Render Login screen
 */
router.get('/login', loginCtrl.renderLoginForm);

/**
 * 2. Process Login screen
 */
router.post('/login', loginCtrl.handleLoginFormSubmit);

/**
 * 3. Start Challenge handshake
 */
router.get('/authorize', authCtrl.redirectToLogin);
router.post('/authorize', authCtrl.middleware, authCtrl.authorize);

/**
 * 4. Verify Challenge handshake
 */
router.post('/token', tokenCtrl.middleware, tokenCtrl.token);

/**
 * Token renewal
 */
router.post('/renew', tokenCtrl.renew);

/**
 * Who am I request handler
 */
router.post('/whoami', middleware.user, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
