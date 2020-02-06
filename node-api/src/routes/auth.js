const express = require('express');
// const { decoder, queryString, devCredentials } = require('../utils');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('AUTH');
});

/**
 * 1. Render Login screen
 */
router.get('/login', (req, res, errors) => {
  const { authUrl } = req.urls;
  const action = `${authUrl}/login`;
  // const creds = devCredentials();
  // res.render('signin', { action, errors, ...creds });
  res.render('signin', { action, errors });
});

/**
 * 2. Process Login screen
 */
router.post('/login', (req, res) => {
  const { body } = req;

  res.json(body);
});

module.exports = router;
