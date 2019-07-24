exports.up = knex => {
  return knex.schema.createTable('assets', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('assetCategoryId')
      .unsigned()
      .index();
    t.integer('fileId')
      .unsigned()
      .index();
    t.string('title', 120)
      .notNullable()
      .unique();
    t.string('slug')
      .notNullable()
      .index();
    t.text('description');

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('assets');
};
