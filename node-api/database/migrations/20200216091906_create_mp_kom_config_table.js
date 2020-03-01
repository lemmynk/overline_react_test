exports.up = knex => {
  return knex.schema.createTable('mp_kom_config', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('vKom')
      .notNullable()
      .index()
      .comment('00x-vrsta [1-firma, 0-priv.], 0x0-kupac, x00-dobavljac');

    t.string('pattern', 12).notNullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_kom_config');
};
