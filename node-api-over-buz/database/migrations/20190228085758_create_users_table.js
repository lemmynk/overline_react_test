exports.up = knex => {
  return knex.schema.createTable('users', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.uuid('uuid')
      .notNull()
      .index();
    t.string('username', 120).notNull();
    t.string('firstName', 120).nullable();
    t.string('lastName', 120).nullable();
    t.string('email', 120).nullable();
    t.string('password', 120).nullable();

    t.uuid('refreshToken').nullable();

    t.integer('loginAttempts').defaultTo(0);
    t.dateTime('loginAttemptAt').nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
