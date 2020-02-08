const express = require('express');
const crudController = require('../../controllers/crudController');
const ArtPdv = require('../../models/ArtPdv');

const router = express.Router();

const crudCtrl = crudController(ArtPdv);
router.get('/', crudCtrl.all);
router.post('/', crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', crudCtrl.update);
router.delete('/:id', crudCtrl.delete);

module.exports = router;
