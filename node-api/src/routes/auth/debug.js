const express = require('express');
const User = require('../../models/User');
const { decoder } = require('../../utils');

const router = express.Router();

const expiresAt = (expiresIn = 0) =>
  parseInt(new Date().getTime() / 1000, 0) + expiresIn;

const buildChallenge = verifierCode => {
  const verifier = verifierCode || decoder.uuid();
  const hash = verifier.toUpperCase();
  const challenge = decoder.encryptSync(hash);

  return { verifier, challenge };
};

router.get('/', (req, res) => res.send('DEBUG'));

router.get('/challenge', (req, res) => {
  const { verifier, challenge } = buildChallenge();

  const encryptedVerifier = decoder.encryptSync(verifier);

  res.json({ verifier, challenge, encryptedVerifier });
});

router.post('/token', (req, res, next) => {
  const { body } = req;
  const { username: userName, expiresIn } = body;

  User.find({ userName })
    .then(user => user.generateTokenPayload(expiresIn))
    .then(response => ({
      ...response,
      exiresAt: expiresAt(response.expiresIn),
    }))
    .then(response => res.json(response))
    .catch(err => next(err));
});

module.exports = router;
