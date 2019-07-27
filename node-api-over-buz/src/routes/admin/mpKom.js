const express = require('express');
const { controllers } = require('@newtash/node-api-core');

const KomMesto = require('../../models/KomMesto');
const KomMain = require('../../models/KomMain');

const mpKomViewController = require('../../controllers/admin/mpKomViewController');

const router = express.Router();

const komMestoCtrl = controllers.crudController(KomMesto);
router.get('/kom-mesto', komMestoCtrl.all);
router.post('/kom-mesto', komMestoCtrl.create);
router.get('/kom-mesto/:id', komMestoCtrl.find);
router.put('/kom-mesto/:id', komMestoCtrl.update);
router.delete('/kom-mesto/:id', komMestoCtrl.delete);

const artMainCtrl = controllers.crudController(KomMain);
router.get('/kom-main', mpKomViewController.all);
router.post('/kom-main', artMainCtrl.create);
router.get('/kom-main/:id', artMainCtrl.find);
router.put('/kom-main/:id', artMainCtrl.update);
router.delete('/kom-main/:id', artMainCtrl.delete);

module.exports = router;
