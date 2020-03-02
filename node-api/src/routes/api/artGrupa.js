const express = require('express');
const crudController = require('../../controllers/crudController');
const ctrl = require('../../controllers/api/artGrupaController');
const ArtGrupa = require('../../models/ArtGrupa');

const router = express.Router();

const crudCtrl = crudController(ArtGrupa);
router.get('/next/:vArtikl', ctrl.nextSifra);
router.get('/init', crudCtrl.init);
router.get('/', crudCtrl.allByVersion);
router.post('/', ArtGrupa.validate(), crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', ArtGrupa.validate(), crudCtrl.update);
router.delete('/:id', ArtGrupa.canDelete(), crudCtrl.delete);

module.exports = router;
