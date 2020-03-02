const express = require('express');
const crudController = require('../../controllers/crudController');
const ctrl = require('../../controllers/api/artMainController');
const ArtMain = require('../../models/ArtMain');
const ArtMainView = require('../../models/ArtMainView');

const router = express.Router();

const viewCtrl = crudController(ArtMainView);
const crudCtrl = crudController(ArtMain);
router.get('/next', ctrl.nextSifra);
router.get('/init', crudCtrl.init);
router.get('/', viewCtrl.allPaginated);
router.post('/', ArtMain.validate(), crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', ArtMain.validate(), crudCtrl.update);
router.delete('/:id', crudCtrl.delete);

module.exports = router;
