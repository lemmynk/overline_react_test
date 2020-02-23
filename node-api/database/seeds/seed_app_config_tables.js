const seeder = require('../config');
const appConfigCategories = require('../data/appConfigCategories.json');
const appConfig = require('../data/appConfig');
const appConfigUser = require('../data/appConfigUser.json');

// TBC: This works, maybe we should load different data per environment (?!)
// console.log('ENVIRONMENT:', process.env.ENVIRONMENT);

exports.seed = knex =>
  seeder(knex, 'app_config_categories', appConfigCategories.data)
    .then(() => seeder(knex, 'app_config', appConfig))
    .then(() => seeder(knex, 'app_config_user', appConfigUser.data));
