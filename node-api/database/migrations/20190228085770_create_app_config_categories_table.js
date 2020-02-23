exports.up = knex => {
  return knex.schema.createTable('app_config_categories', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.string('name', 120)
      .notNullable()
      .index();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('app_config_categories');
};
