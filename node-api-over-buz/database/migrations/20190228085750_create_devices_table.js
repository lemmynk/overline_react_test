exports.up = knex => {
  return knex.schema.createTable('devices', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.uuid('uuid')
      .notNull()
      .index();
    t.string('platform', 12).nullable();
    t.string('appVersion', 24).nullable();
    t.uuid('refreshToken').nullable();
    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable('devices');
};
