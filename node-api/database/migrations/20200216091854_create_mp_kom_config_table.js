exports.up = knex => {
  return knex.schema.createTable('mp_kom_config', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('vKom')
      .notNullable()
      .index()
      .comment('000x-firma, 00x0-kupac, 0x00-dobavljac, x000-privatno lice');

    t.boolean('isDefault').defaultTo(false);

    t.string('pattern', 12).notNullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_kom_config');
};
