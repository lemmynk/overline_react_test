const express = require('express');
const { controllers } = require('@newtash/node-api-core');

const KomMesto = require('../../models/KomMesto');
const KomMain = require('../../models/KomMain');
const KomView = require('../../models/KomView');

const router = express.Router();

const komMestoCtrl = controllers.crudController(KomMesto);
router.get('/kom-mesto', komMestoCtrl.all);
router.post('/kom-mesto', komMestoCtrl.create);
router.get('/kom-mesto/:id', komMestoCtrl.find);
router.put('/kom-mesto/:id', komMestoCtrl.update);
router.delete('/kom-mesto/:id', komMestoCtrl.delete);

const komMainCtrl = controllers.crudController(KomMain);
const komViewCtrl = controllers.crudController(KomView);
router.get('/kom-main', komViewCtrl.allPaginated);
router.post('/kom-main', komMainCtrl.create);
router.get('/kom-main/:id', komMainCtrl.find);
router.put('/kom-main/:id', komMainCtrl.update);
router.delete('/kom-main/:id', komMainCtrl.delete);

module.exports = router;
