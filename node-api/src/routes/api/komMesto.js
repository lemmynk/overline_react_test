const express = require('express');
const crudController = require('../../controllers/crudController');
const KomMesto = require('../../models/KomMesto');

const router = express.Router();

const crudCtrl = crudController(KomMesto);
router.get('/init', crudCtrl.init);
router.get('/', crudCtrl.all);
router.post('/', KomMesto.validate(), crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', KomMesto.validate(), crudCtrl.update);
router.delete('/:id', KomMesto.canDelete(), crudCtrl.delete);

module.exports = router;
