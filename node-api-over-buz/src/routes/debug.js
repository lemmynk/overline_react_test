const lib = require('@newtash/node-api-core');

const express = require('express');

const { utils, models } = lib;

const router = express.Router();

/*
 |------------------------------------------------------------------------
 | SCRYPTIFY
 |------------------------------------------------------------------------
 */
/**
 * Scryptify string
 */
router.get('/encrypt', (req, res, next) => {
  const { code } = req.query;
  const { encrypt } = utils.decoder;
  encrypt(code)
    .then(response => res.json({ response }))
    .catch(err => next(err));
});

/**
 * Decode scryptified string
 */
router.get('/decrypt', (req, res, next) => {
  const { code } = req.query;
  const { decrypt } = utils.decoder;
  decrypt(code)
    .then(response => res.json({ response }))
    .catch(err => next(err));
});

/*
 |------------------------------------------------------------------------
 | DEVICES
 |------------------------------------------------------------------------
 */
/**
 * Build challenge
 */
router.get('/challenge', (req, res, next) => {
  const { Challenger } = utils;
  const secret = process.env.SCRYPTIFY_SECRET;
  const c = new Challenger(secret);
  c.buildChallenge()
    .then(challenge => res.json(challenge))
    .catch(err => next(err));
});

/**
 * List all devices
 */
router.get('/devices', (req, res, next) => {
  const { Device } = lib.models;

  Device.findAll({}, req.query)
    .then(response => res.json(response))
    .catch(err => next(err));
});

/**
 * Generate tokens for device
 */
router.get('/devices/auth', (req, res, next) => {
  const { uuid, expiresIn } = req.query;
  const { Device } = lib.models;

  Device.find({ uuid })
    .then(model => model.generateTokenPayload(expiresIn))
    .then(response => res.json(response))
    .catch(err => next(err));
});

/*
 |------------------------------------------------------------------------
 | USERS
 |------------------------------------------------------------------------
 */
/**
 * List all users
 */
router.get('/users', (req, res, next) => {
  const { User } = lib.models;

  User.findAll({}, req.query)
    .then(response => res.json(response))
    .catch(err => next(err));
});

/**
 * Generate tokens for user
 */
router.get('/users/auth', (req, res, next) => {
  const { uuid, expiresIn } = req.query;
  const { User } = lib.models;

  User.find({ uuid })
    .then(model => model.generateTokenPayload(expiresIn))
    .then(response => res.json(response))
    .catch(err => next(err));
});

/**
 * Generate password hash
 */
router.get('/hash', (req, res, next) => {
  const { password } = req.query;
  const { passwordHash } = utils.decoder;

  passwordHash(password)
    .then(hash => res.json({ hash }))
    .catch(err => next(err));
});

/**
 * Authenticate user
 */
router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;
  const { User } = models;

  User.authenticate(username, password)
    .then(() => res.send('OK'))
    .catch(err => next(err));
});

module.exports = router;
