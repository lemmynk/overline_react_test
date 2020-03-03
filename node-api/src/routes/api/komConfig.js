const express = require('express');
const ctrl = require('../../controllers/api/komConfigController');

const router = express.Router();

router.get('/vKoms', ctrl.vKoms);

module.exports = router;
