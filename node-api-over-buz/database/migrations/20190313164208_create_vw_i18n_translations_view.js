const sqlDrop = `DROP VIEW IF EXISTS vw_i18n_translations`;
const sqlCreate = `CREATE VIEW vw_i18n_translations AS
SELECT
  t.id,
	n.route,
	t.lang,
	n.key AS namespace,
	t.key,
	t.translation
FROM i18n_translations AS t
INNER JOIN i18n_namespaces AS n ON t.namespaceId = n.id
WHERE t.deletedAt IS NULL AND n.deletedAt IS NULL
`;

exports.up = knex => {
  return knex.schema.raw(sqlDrop).then(() => knex.schema.raw(sqlCreate));
};

exports.down = knex => {
  return knex.schema.raw(sqlDrop);
};
