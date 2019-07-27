const express = require('express');
const { controllers } = require('@newtash/node-api-core');

const ArtPdv = require('../../models/ArtPdv');
const ArtGrupa = require('../../models/ArtGrupa');
const ArtMain = require('../../models/ArtMain');

const mpArtViewController = require('../../controllers/admin/mpArtViewController');

const router = express.Router();

const artPdvCtrl = controllers.crudController(ArtPdv);
router.get('/art-pdv', artPdvCtrl.all);
router.post('/art-pdv', artPdvCtrl.create);
router.get('/art-pdv/:id', artPdvCtrl.find);
router.put('/art-pdv/:id', artPdvCtrl.update);
router.delete('/art-pdv/:id', artPdvCtrl.delete);

const artGrupaCtrl = controllers.crudController(ArtGrupa);
router.get('/art-grupa', artGrupaCtrl.all);
router.post('/art-grupa', artGrupaCtrl.create);
router.get('/art-grupa/:id', artGrupaCtrl.find);
router.put('/art-grupa/:id', artGrupaCtrl.update);
router.delete('/art-grupa/:id', artGrupaCtrl.delete);

const artMainCtrl = controllers.crudController(ArtMain);
router.get('/art-main', mpArtViewController.all);
router.post('/art-main', artMainCtrl.create);
router.get('/art-main/:id', artMainCtrl.find);
router.put('/art-main/:id', artMainCtrl.update);
router.delete('/art-main/:id', artMainCtrl.delete);

module.exports = router;
