exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('i18n_translations')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('i18n_translations').insert([
        {
          id: 1,
          namespaceId: 1,
          lang: 'en',
          key: 'save',
          translation: 'Save',
          createdAt: knex.fn.now(),
        },
        {
          id: 2,
          namespaceId: 1,
          lang: 'en',
          key: 'cancel',
          translation: 'Cancel',
          createdAt: knex.fn.now(),
        },
        {
          id: 3,
          namespaceId: 1,
          lang: 'sr',
          key: 'save',
          translation: 'Snimi',
          createdAt: knex.fn.now(),
        },
        {
          id: 4,
          namespaceId: 1,
          lang: 'sr',
          key: 'cancel',
          translation: 'Odustani',
          createdAt: knex.fn.now(),
        },
        {
          id: 5,
          namespaceId: 2,
          lang: 'en',
          key: 'title',
          translation: "Can't stop...",
          createdAt: knex.fn.now(),
        },
        {
          id: 6,
          namespaceId: 2,
          lang: 'sr',
          key: 'title',
          translation: 'Dalje neces moci...',
          createdAt: knex.fn.now(),
        },
      ]);
    });
};
