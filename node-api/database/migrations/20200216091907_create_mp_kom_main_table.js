exports.up = knex => {
  return knex.schema.createTable('mp_kom_main', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.string('pib', 12).notNullable();
    t.string('komime', 60).notNullable();
    t.string('intsifra', 12).notNullable();
    t.string('naziv', 120).notNullable();
    t.string('adresa', 120).notNullable();
    t.integer('mestoId')
      .unsigned()
      .notNullable();
    t.string('telefon', 120).notNullable();
    t.string('fax', 120).notNullable();
    t.string('vlasnik', 120).nullable();
    t.string('kontakt', 120).nullable();
    t.string('mobilni', 120).nullable();
    t.string('web', 120).nullable();
    t.string('email', 120).nullable();

    t.boolean('pdvObveznik')
      .notNullable()
      .defaultTo(false);
    t.string('pdvBroj', 30).nullable();
    t.string('maticniBroj', 30).nullable();
    t.string('sifraDelatnosti', 30).nullable();
    t.text('napomena').nullable();

    t.boolean('isKupac')
      .defaultTo(true)
      .notNullable()
      .index();
    t.boolean('isDobavljac')
      .defaultTo(false)
      .notNullable()
      .index();
    t.boolean('isFirma')
      .defaultTo(true)
      .notNullable()
      .index();
    t.boolean('isSuspended')
      .defaultTo(false)
      .notNullable()
      .index()
      .comment('da li je klijent suspendovan; zabrani prodaju');

    t.integer('prodValuta')
      .notNullable()
      .defaultTo(0)
      .comment('default prodajna valuta');
    t.integer('prodRabat')
      .notNullable()
      .defaultTo(0)
      .comment('default prodajni rabat');
    t.integer('prodLimit')
      .notNullable()
      .defaultTo(0)
      .comment('odobreni kreditni rabat');
    t.integer('nabDpo')
      .notNullable()
      .defaultTo(0)
      .comment('odobreni broj dpo dana');

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_kom_main');
};
