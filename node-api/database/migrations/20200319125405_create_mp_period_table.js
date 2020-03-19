exports.up = knex => {
  return knex.schema.createTable('mp_period', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('name', 60).notNullable();
    t.date('dateFrom').notNullable();
    t.date('dateTo').notNullable();
    t.boolean('isDefault').defaultTo(false);

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_period');
};
