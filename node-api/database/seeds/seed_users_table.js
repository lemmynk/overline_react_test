const decoder = require('../decoder');

exports.seed = knex => {
  // Truncate ALL existing entries
  return knex('users')
    .truncate()
    .then(() => {
      const dataPera = {
        uuid: decoder.uuid(),
        userName: 'pera',
        firstName: 'Pera',
        lastName: 'Zdera',
        email: 'pera@zdera.com',
        role: 'developer',
        createdAt: knex.raw('NOW()'),
      };
      const dataAdmin = {
        uuid: decoder.uuid(),
        userName: 'admin',
        firstName: 'Admin',
        lastName: '',
        email: 'admin@admin.com',
        role: 'admin',
        createdAt: knex.raw('NOW()'),
      };
      const dataDemo = {
        uuid: decoder.uuid(),
        userName: 'demo',
        firstName: 'Demo',
        lastName: '',
        email: 'demo@demo.com',
        role: 'editor',
        createdAt: knex.raw('NOW()'),
      };

      return decoder
        .passwordHash('zdera')
        .then(hash => {
          dataPera.password = hash;
          return knex('users').insert([dataPera]);
        })
        .then(() => decoder.passwordHash('admin'))
        .then(hash => {
          dataAdmin.password = hash;
          return knex('users').insert([dataAdmin]);
        })
        .then(() => decoder.passwordHash('demo'))
        .then(hash => {
          dataDemo.password = hash;
          return knex('users').insert([dataDemo]);
        });
    });
};
