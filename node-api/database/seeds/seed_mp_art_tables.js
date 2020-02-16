const seeder = require('../config');
const artPdv = require('../data/artPdv.json');
const artGrupa = require('../data/artGrupa.json');
const artMain = require('../data/artMain.json');

// TBC: This works, maybe we should load different data per environment (?!)
// console.log('ENVIRONMENT:', process.env.ENVIRONMENT);

exports.seed = knex =>
  seeder(knex, 'mp_art_pdv', artPdv.data)
    .then(() => seeder(knex, 'mp_art_grupa', artGrupa.data))
    .then(() => seeder(knex, 'mp_art_main', artMain.data));
