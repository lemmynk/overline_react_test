const seeder = require('../config');
const magConfig = require('../data/magConfig');
const magMain = require('../data/magMain');

// TBC: This works, maybe we should load different data per environment (?!)
// console.log('ENVIRONMENT:', process.env.ENVIRONMENT);

exports.seed = knex =>
  seeder(knex, 'mp_mag_config', magConfig).then(() =>
    seeder(knex, 'mp_mag_main', magMain),
  );
