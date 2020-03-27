exports.up = knex => {
  return knex.schema.createTable('user_tokens', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.uuid('userUuid')
      .notNull()
      .index();

    t.uuid('refreshToken').notNullable();
    t.integer('expiresAt').notNullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('user_tokens');
};
