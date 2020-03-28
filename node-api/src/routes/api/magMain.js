const express = require('express');
const crudController = require('../../controllers/crudController');
const MagMain = require('../../models/MagMain');

const router = express.Router();

const crudCtrl = crudController(MagMain);
router.get('/init', crudCtrl.init);
router.get('/', crudCtrl.allPaginated);
router.post('/', MagMain.validate(), crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', MagMain.validate(), crudCtrl.update);
router.delete('/:id', crudCtrl.delete);

module.exports = router;
