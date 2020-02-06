const seeder = require('../config');
const data = require('../data/artPdv.json');

exports.seed = knex => seeder(knex, 'mp_art_pdv', data.data);
