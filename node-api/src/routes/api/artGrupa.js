const express = require('express');
const crudController = require('../../controllers/crudController');
const ArtGrupa = require('../../models/ArtGrupa');

const router = express.Router();

const crudCtrl = crudController(ArtGrupa);
router.get('/', crudCtrl.all);
router.post('/', crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', crudCtrl.update);
router.delete('/:id', crudCtrl.delete);

module.exports = router;
