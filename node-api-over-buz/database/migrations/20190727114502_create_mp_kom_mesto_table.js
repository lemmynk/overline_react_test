exports.up = knex => {
  return knex.schema.createTable('mp_kom_mesto', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('zip', 6).notNullable();
    t.string('naziv', 120).notNullable();
    t.string('opstina', 120).notNullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_kom_mesto');
};
