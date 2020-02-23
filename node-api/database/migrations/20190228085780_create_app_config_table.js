exports.up = knex => {
  return knex.schema.createTable('app_config', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('catId')
      .notNullable()
      .index();

    t.string('name', 120)
      .notNullable()
      .index();
    t.enum('valueType', ['string', 'number', 'boolean', 'json'])
      .notNullable()
      .defaultTo('string');
    t.text('value').nullable();
    t.boolean('userSpecific')
      .notNullable()
      .defaultTo(false);
    t.text('description').nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('app_config');
};
