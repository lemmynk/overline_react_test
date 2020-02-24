const express = require('express');
const { decoder } = require('../../utils');

const router = express.Router();

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

module.exports = router;
