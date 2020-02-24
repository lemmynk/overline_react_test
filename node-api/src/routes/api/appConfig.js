const express = require('express');
const AppConfig = require('../../models/AppConfig');
const crudController = require('../../controllers/crudController');
const ctrl = require('../../controllers/api/appConfigController');

const router = express.Router();

router.get('/api', ctrl.api);
router.get('/api/:catName', ctrl.api);

const appConfigCrudCtrl = crudController(AppConfig);
router.get('/', appConfigCrudCtrl.allByVersion);

module.exports = router;
