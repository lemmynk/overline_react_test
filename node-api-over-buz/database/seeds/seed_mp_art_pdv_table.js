const seeder = require('../config');
const data = require('../data/artPdv');

exports.seed = knex => seeder(knex, 'mp_art_pdv', data);
