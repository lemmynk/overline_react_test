const { utils } = require('@newtash/node-api-core');

exports.seed = knex => {
  // Truncate ALL existing entries
  return knex('users')
    .truncate()
    .then(() => {
      const dataPera = {
        uuid: utils.decoder.uuid(),
        username: 'pera',
        firstName: 'Pera',
        lastName: 'Zdera',
        email: 'pera@zdera.com',
        role: 'developer',
        createdAt: knex.raw('NOW()'),
      };
      const dataMirko = {
        uuid: utils.decoder.uuid(),
        username: 'mirko',
        firstName: 'Mirko',
        lastName: 'Stevanov',
        email: 'office@cngdrum.com',
        role: 'editor',
        createdAt: knex.raw('NOW()'),
      };

      return utils.decoder
        .passwordHash('zdera')
        .then(hash => {
          dataPera.password = hash;
          return knex('users').insert([dataPera]);
        })
        .then(() => utils.decoder.passwordHash('Inglatera2015'))
        .then(hash => {
          dataMirko.password = hash;
          return knex('users').insert([dataMirko]);
        });
    });
};
