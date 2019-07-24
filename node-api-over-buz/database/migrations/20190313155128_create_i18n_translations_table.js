const languages = require('../config/languages');

exports.up = knex => {
  return knex.schema.createTable('i18n_translations', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('namespaceId').unsigned();
    t.enum('lang', languages)
      .notNullable()
      .defaultTo('en');
    t.string('key', 12).notNullable();
    t.index(['namespaceId', 'lang', 'key']);
    t.string('translation').nullable();
    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('i18n_translations');
};
