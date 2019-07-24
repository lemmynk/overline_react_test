exports.up = knex => {
  return knex.schema.createTable('device_logs', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.integer('deviceId').notNull();
    t.date('date').notNull();
    t.string('platform', 12).nullable();
    t.dateTime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable('device_logs');
};
