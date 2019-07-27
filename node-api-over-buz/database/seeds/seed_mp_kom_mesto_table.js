const seeder = require('../config');
const data = require('../data/komMesto');

exports.seed = knex => seeder(knex, 'mp_kom_mesto', data);
