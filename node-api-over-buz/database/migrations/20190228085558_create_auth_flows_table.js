exports.up = knex => {
  return knex.schema.createTable('auth_flows', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.uuid('authCode').notNull();
    t.uuid('handshakeCode').nullable();
    t.string('challengeCode', 255).nullable();
    t.bool('challengeVerified').defaultTo(false);
    t.uuid('userUuid').nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable('auth_flows');
};
