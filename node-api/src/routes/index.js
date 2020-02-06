const express = require('express');
const uuid4 = require('uuid4');
const { encryptSync, decryptSync, generateToken } = require('../utils');

const router = express.Router();

router.get('/', (req, res) => {
  const uuid = uuid4();
  const encrypted = encryptSync('whatever');
  const decrypted = decryptSync(encrypted);

  generateToken({ uuid }).then(response => {
    res.json({ uuid, encrypted, decrypted, ...response });
  });
  // res.render('index');
});

module.exports = router;
