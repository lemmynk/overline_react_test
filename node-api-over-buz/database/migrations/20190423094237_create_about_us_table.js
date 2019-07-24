exports.up = knex => {
  return knex.schema.createTable('about_us', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.text('paragraph', 'longtext').notNullable();
    t.integer('position').notNullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('about_us');
};
