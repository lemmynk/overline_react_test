const express = require('express');
const middleware = require('../middleware');
const User = require('../../models/User');
const crudController = require('../../controllers/crudController');

const router = express.Router();

/**
 * Who am I request handler
 */
router.get('/whoami', middleware.user, (req, res) => {
  res.json(req.auth);
});

const userCrudCtrl = crudController(User);
router.get('/', userCrudCtrl.allByVersion);

module.exports = router;
