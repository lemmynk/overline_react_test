const vPromet = require('../config/vPromet');

exports.up = knex => {
  return knex.schema.createTable('mp_mag_config', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.enum('vPromet', vPromet.enums)
      .defaultTo(vPromet.defaultPromet)
      .notNullable()
      .index();

    t.integer('defaultMagId').nullable();
    t.boolean('isDefault').defaultTo(false);

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_mag_config');
};
