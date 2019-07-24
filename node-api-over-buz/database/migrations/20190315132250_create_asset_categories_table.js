exports.up = knex => {
  return knex.schema.createTable('asset_categories', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.string('name', 120).notNullable();
    t.text('thumbs').nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('asset_categories');
};
