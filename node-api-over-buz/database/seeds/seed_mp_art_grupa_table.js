const seeder = require('../config');
const data = require('../data/artGrupa.json');

exports.seed = knex => seeder(knex, 'mp_art_grupa', data.data);
