const express = require('express');
const crudController = require('../../controllers/crudController');
const ArtGrupa = require('../../models/ArtGrupa');

const router = express.Router();

const crudCtrl = crudController(ArtGrupa);
router.get('/', crudCtrl.all);
router.post('/', ArtGrupa.validate(), crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', ArtGrupa.validate(), crudCtrl.update);
// router.delete('/:id', crudCtrl.delete);
router.delete('/:id', ArtGrupa.canDelete(), crudCtrl.delete);

module.exports = router;
