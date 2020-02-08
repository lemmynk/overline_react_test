const seeder = require('../config');
const data = require('../data/appConfig');

exports.seed = knex => seeder(knex, 'app_config', data);
