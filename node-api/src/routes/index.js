const express = require('express');
const uuid4 = require('uuid4');
const { decoder, tokenizer } = require('../utils');

const router = express.Router();

router.get('/', (req, res) => {
  const uuid = uuid4();
  const encrypted = decoder.encryptSync('whatever');
  const decrypted = decoder.decryptSync(encrypted);

  tokenizer.generateToken({ uuid }).then(response => {
    res.json({ uuid, encrypted, decrypted, ...response });
  });
  // res.render('index');
});

module.exports = router;
