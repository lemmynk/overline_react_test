exports.up = knex => {
  return knex.schema.createTable('i18n_namespaces', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.enum('route', ['api', 'admin', 'auth']).defaultTo('admin');
    t.string('key', 12).notNullable();
    t.index(['route', 'key']);
    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('i18n_namespaces');
};
