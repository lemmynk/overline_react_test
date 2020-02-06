const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('AUTH');
});

/**
 * 1. Render Login screen
 */
router.get('/login', (req, res) => {
  const params =
    process.env.ENVIRONMENT === 'development'
      ? {
          username: process.env.DEV_USERNAME,
          password: process.env.DEV_PASSWORD,
        }
      : {};

  res.render('signin', params);
});

/**
 * 2. Process Login screen
 */
router.post('/login', (req, res) => {
  const { body } = req;

  res.json(body);
});

module.exports = router;
