const express = require('express');
const crudController = require('../../controllers/crudController');
const ctrl = require('../../controllers/api/periodsController');
const Period = require('../../models/Period');

const router = express.Router();

const crudCtrl = crudController(Period);
router.get('/default', ctrl.getDefault);
router.get('/', crudCtrl.all);
router.post('/', Period.validate(), crudCtrl.create);
router.get('/:id', crudCtrl.find);
router.put('/:id', Period.validate(), crudCtrl.update);
router.delete('/:id', crudCtrl.delete);

module.exports = router;
