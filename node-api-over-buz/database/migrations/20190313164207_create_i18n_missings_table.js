exports.up = knex => {
  return knex.schema.createTable('i18n_missings', t => {
    t.increments('id')
      .unsigned()
      .primary();

    t.enum('route', ['api', 'admin', 'auth']).defaultTo('admin');
    t.string('lang', 6).notNullable();
    t.text('body').notNullable();
    t.dateTime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable('i18n_missings');
};
