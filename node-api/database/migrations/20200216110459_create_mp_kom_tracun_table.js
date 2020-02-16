exports.up = knex => {
  return knex.schema.createTable('mp_kom_tracun', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.integer('komId').notNullable();
    t.string('tracun', 30).notNullable();
    t.string('banka', 120).notNullable();
    t.boolean('isDefault').defaultTo(false);

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_kom_tracun');
};
