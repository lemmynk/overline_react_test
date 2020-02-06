const seeder = require('../config');
const data = require('../data/komMain');

exports.seed = knex => seeder(knex, 'mp_kom_main', data);
