const vPromet = require('../config/vPromet');

exports.up = knex => {
  return knex.schema.createTable('mp_mag_main', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.enum('vPromet', vPromet.enums)
      .defaultTo(vPromet.defaultPromet)
      .notNullable();
    t.string('sifra', 12).notNullable();
    t.string('magNaziv', 60).notNullable();

    t.string('kepuNaziv', 60).nullable();
    t.string('kepuMesto', 60).nullable();

    t.text('opis').nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_mag_main');
};
