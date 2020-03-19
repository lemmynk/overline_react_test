const seeder = require('../config');
const mpPeriod = require('../data/mpPeriod');

exports.seed = knex =>
  seeder(knex, 'mp_period', mpPeriod).then(() =>
    console.log('...add more doc seeds'),
  );
