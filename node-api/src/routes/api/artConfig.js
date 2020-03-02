const express = require('express');
// const ArtConfig = require('../../models/ArtConfig');
const ctrl = require('../../controllers/api/artConfigController');

const router = express.Router();

router.get('/vArtikli', ctrl.vArtikli);
router.get('/default', ctrl.defaultVArtikl);

module.exports = router;
