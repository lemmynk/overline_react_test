exports.up = knex => {
  return knex.schema.createTable('app_config', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.string('key', 120)
      .notNullable()
      .index();
    t.enum('type', ['string', 'number', 'boolean', 'json'])
      .notNullable()
      .defaultTo('string');
    t.text('value').nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('app_config');
};
