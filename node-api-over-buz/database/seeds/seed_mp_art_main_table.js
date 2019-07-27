const seeder = require('../config');
const data = require('../data/artMain');

exports.seed = knex => seeder(knex, 'mp_art_main', data);
