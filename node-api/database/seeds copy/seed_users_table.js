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
      const dataAdmin = {
        uuid: utils.decoder.uuid(),
        username: 'admin',
        firstName: 'Admin',
        lastName: '',
        email: 'admin@admin.com',
        role: 'admin',
        createdAt: knex.raw('NOW()'),
      };
      const dataDemo = {
        uuid: utils.decoder.uuid(),
        username: 'demo',
        firstName: 'Demo',
        lastName: '',
        email: 'demo@demo.com',
        role: 'editor',
        createdAt: knex.raw('NOW()'),
      };

      return utils.decoder
        .passwordHash('zdera')
        .then(hash => {
          dataPera.password = hash;
          return knex('users').insert([dataPera]);
        })
        .then(() => utils.decoder.passwordHash('admin'))
        .then(hash => {
          dataAdmin.password = hash;
          return knex('users').insert([dataAdmin]);
        })
        .then(() => utils.decoder.passwordHash('demo'))
        .then(hash => {
          dataDemo.password = hash;
          return knex('users').insert([dataDemo]);
        });
    });
};
