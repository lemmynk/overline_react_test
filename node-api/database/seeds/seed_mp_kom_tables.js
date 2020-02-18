const seeder = require('../config');
const komMestoData = require('../data/komMesto');
const komMainData = require('../data/komMain');

// TBC: This works, maybe we should load different data per environment (?!)
// console.log('ENVIRONMENT:', process.env.ENVIRONMENT);

exports.seed = knex =>
  seeder(knex, 'mp_kom_mesto', komMestoData)
    .then(() => seeder(knex, 'mp_kom_main', komMainData))
    .then(() => console.log('...and...'));