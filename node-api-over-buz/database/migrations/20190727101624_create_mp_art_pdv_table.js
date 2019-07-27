exports.up = knex => {
  return knex.schema.createTable('mp_art_pdv', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('pdvStopa')
      .unsigned()
      .index();
    t.string('pdvOpis', 120).notNullable();
    t.boolean('isDefault').defaultTo(false);

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_art_pdv');
};
