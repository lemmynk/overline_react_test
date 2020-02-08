exports.up = knex => {
  return knex.schema.createTable('app_config_user', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('appConfigId')
      .notNullable()
      .index();
    t.integer('userId')
      .notNullable()
      .index();
    t.text('value').nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('app_config_user');
};
