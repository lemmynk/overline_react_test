const seeder = require('../config');
const data = require('../config/appConfig');

exports.seed = knex => seeder(knex, 'app_config', data);
