const vArtikl = require('../config/vArtikl');

exports.up = knex => {
  return knex.schema.createTable('mp_art_config', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.enum('vArtikl', vArtikl.enums)
      .notNullable()
      .index();

    t.boolean('isDefault').defaultTo(false);

    t.string('grpPattern', 12).notNullable();
    t.string('artPattern', 12).notNullable();

    t.boolean('grpSifraByVArtikl')
      .notNullable()
      .defaultTo(true)
      .comment('Separate grpSifra by vArtikl');
    t.boolean('artSifraByVArtikl')
      .notNullable()
      .defaultTo(true)
      .comment('Separate artSifra by vArtikl');
    t.boolean('artSifraByGroup')
      .notNullable()
      .defaultTo(false)
      .comment('Separate artSifra by artGroup');

    t.string('defaultMera', 12).notNullable();
    t.integer('defaultPdvId')
      .notNullable()
      .defaultTo(1);

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_art_config');
};
