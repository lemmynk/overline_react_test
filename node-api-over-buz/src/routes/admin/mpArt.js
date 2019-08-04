const express = require('express');
const { controllers } = require('@newtash/node-api-core');

const ArtPdv = require('../../models/ArtPdv');
const ArtGrupa = require('../../models/ArtGrupa');
const ArtMain = require('../../models/ArtMain');
const ArtView = require('../../models/ArtView');

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

// ArtMain
const roba = process.env.ARTIKL_ROBA;
const usluga = process.env.ARTIKL_USLUGA;
const artMainCtrl = controllers.crudController(ArtMain);
const artViewCtrl = controllers.crudController(ArtView, 'vArtikl', {
  orderBy: 'artNaziv',
});
router.get(
  `/art-main/:vArtikl(${roba}|${usluga})`,
  artViewCtrl.allByPagination,
);
router.post('/art-main', artMainCtrl.create);
router.get('/art-main/:id', artMainCtrl.find);
router.put('/art-main/:id', artMainCtrl.update);
router.delete('/art-main/:id', artMainCtrl.delete);

module.exports = router;
