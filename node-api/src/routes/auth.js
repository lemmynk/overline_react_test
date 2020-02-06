const express = require('express');
const ctrl = require('../controllers/auth/authController');
// const { decoder, queryString, devCredentials } = require('../utils');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('AUTH');
});

/**
 * 1. Render Login screen
 */
router.get('/login', ctrl.renderLoginForm);

/**
 * 2. Process Login screen
 */
router.post('/login', ctrl.handleLoginFormSubmit);

module.exports = router;
