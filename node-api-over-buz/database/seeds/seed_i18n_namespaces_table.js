exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('i18n_namespaces')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('i18n_namespaces').insert([
        {
          id: 1,
          route: 'admin',
          key: 'buttons',
          createdAt: knex.fn.now(),
        },
        {
          id: 2,
          route: 'admin',
          key: 'home',
          createdAt: knex.fn.now(),
        },
      ]);
    });
};
