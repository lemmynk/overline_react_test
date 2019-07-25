const insert = require('../data');
const data = require('../data/i18n_translations.json');

exports.seed = knex => insert(knex, 'i18n_translations', data);
