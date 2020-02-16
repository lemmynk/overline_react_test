const express = require('express');
const crudController = require('../../controllers/crudController');
const ArtMain = require('../../models/ArtMain');

const router = express.Router();

const crudCtrl = crudController(ArtMain);
router.get('/', crudCtrl.allPaginated);
router.post('/', ArtMain.validate(), crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', ArtMain.validate(), crudCtrl.update);
router.delete('/:id', crudCtrl.delete);

module.exports = router;
