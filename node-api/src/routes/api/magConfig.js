const express = require('express');
const ctrl = require('../../controllers/api/magConfigController');

const router = express.Router();

router.get('/vPromets', ctrl.vPromets);
router.get('/default', ctrl.defaultVPromet);

module.exports = router;
