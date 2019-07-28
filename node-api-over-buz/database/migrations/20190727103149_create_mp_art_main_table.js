const vArtiklEnum = require('../config/vArtikl');

exports.up = knex => {
  return knex.schema.createTable('mp_art_main', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.enum('vArtikl', vArtiklEnum)
      .defaultTo('roba')
      .notNullable()
      .index();
    t.integer('grpId')
      .unsigned()
      .index();
    t.string('intSifra', 20).notNullable();
    // t.string('barkod', 20).notNullable();
    t.string('artNaziv', 120).notNullable();
    t.string('mera', 20).notNullable();
    t.integer('pdvId')
      .notNullable()
      .defaultTo(4);
    // t.integer('pdvStopa')
    //   .notNullable()
    //   .defaultTo(1800);

    // t.string('proizvodjac', 120)
    //   .nullable()
    //   .comment('proizvodjac iz tabele art_proizvodjac');
    // t.text('opis').nullable();

    // t.integer('cenaMp')
    //   .notNullable()
    //   .defaultTo(0)
    //   .comment('mp cena usluga i gp-a');
    // t.integer('cenaPopust')
    //   .notNullable()
    //   .defaultTo(0)
    //   .comment('procenat popusta na mp cenu');
    // t.boolean('cenaPrikaz')
    //   .defaultTo(false)
    //   .comment('da li se artikl prikazuje u cenovniku');
    // t.boolean('prodSuma')
    //   .defaultTo(0)
    //   .comment('umesto kolicine, upisuje se suma uplate');

    // t.boolean('fisLocked')
    //   .defaultTo(0)
    //   .comment(
    //     'da li je vec odstampan u fis printeru i ne moze mu se menjati naziv???',
    //   );
    // t.integer('fisCena').defaultTo(0);
    // t.string('grpNaziv', 60)
    //   .nullable()
    //   .comment('pomocno polje za brzi prikaz naziva grupe');

    t.dateTime('createdAt').defaultTo(knex.fn.now());
    t.dateTime('updatedAt').defaultTo(knex.fn.now());
    t.dateTime('deletedAt').nullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('mp_art_main');
};
