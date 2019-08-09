const vArtiklEnum = require('../config/vArtikl');

exports.up = knex => {
  return knex.schema.createTable('mp_art_grupa', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.enum('vArtikl', vArtiklEnum)
      .defaultTo('roba')
      .notNullable()
      .index();
    t.string('grpNaziv', 120).notNullable();
    t.string('grpSifra', 20).notNullable();
    // t.string('redosled', 20).nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_art_grupa');
};
