const insert = require('../data');
const data = require('../data/i18n_namespaces.json');

exports.seed = knex => insert(knex, 'i18n_namespaces', data);
