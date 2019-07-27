exports.up = knex => {
  return knex.schema.createTable('files', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('fileName').notNullable();
    t.string('fileMime', 24).notNullable();
    t.integer('fileSize').unsigned();
    t.string('fileEncoding', 12).nullable();
    t.text('fileBase64', 'longtext').nullable();
    t.string('filePath').nullable();

    t.dateTime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable('files');
};
