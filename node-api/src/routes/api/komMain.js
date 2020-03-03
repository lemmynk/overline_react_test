const express = require('express');
const crudController = require('../../controllers/crudController');
const ctrl = require('../../controllers/api/komMainController');
const KomMain = require('../../models/KomMain');

const router = express.Router();

const crudCtrl = crudController(KomMain);
router.get('/next', ctrl.nextSifra);
router.get('/init', crudCtrl.init);
router.get('/', crudCtrl.allPaginated);
router.post('/', KomMain.validate(), crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', KomMain.validate(), crudCtrl.update);
router.delete('/:id', crudCtrl.delete);

module.exports = router;
