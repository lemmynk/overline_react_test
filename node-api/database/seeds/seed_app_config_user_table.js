const seeder = require('../config');
const data = require('../data/appConfigUser');

exports.seed = knex => seeder(knex, 'app_config_user', data);
