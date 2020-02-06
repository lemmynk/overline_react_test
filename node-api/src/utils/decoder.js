require('dotenv').config();

const scryptify = require('nodemod/dist/scryptify');
const crypto = require('crypto');
const uuid = require('uuid4');
const bcrypt = require('bcrypt');
const { saltRounds, scryptifySecret } = require('./env');

const encryptSync = str => scryptify.encryptSync(str, scryptifySecret);
const decryptSync = str => scryptify.decryptSync(str, scryptifySecret);
const encrypt = str => scryptify.encrypt(str, scryptifySecret);
const decrypt = str => scryptify.decrypt(str, scryptifySecret);

const randomBytes = size => crypto.randomBytes(size);
const base64URLEncode = bytes =>
  bytes
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

const passwordHash = password => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hash(password, salt);
};

const compare = (password, hash) => bcrypt.compare(password, hash);

const buildChallenge = verifier => {
  const verifierCode = verifier || uuid();
  const hash = verifierCode.toUpperCase();
  const challenge = encryptSync(hash);

  return { verifierCode, challenge };
};

const verifyChallenge = (verifierCode, challengeCode) => {
  try {
    // decrypt throws error if something wrong
    const hash = decryptSync(challengeCode);
    const verifier = verifierCode.toUpperCase();

    return hash === verifier;
  } catch (err) {
    // console.error(err.message)
    return false;
  }
};

const self = {
  // uuid4
  uuid,

  // Scryptify
  encrypt,
  decrypt,
  encryptSync,
  decryptSync,

  // Bytes-String-encrypting
  randomBytes,
  base64URLEncode,

  // Password
  passwordHash,
  compare,

  // AuthChallenge
  buildChallenge,
  verifyChallenge,
};

module.exports = self;
