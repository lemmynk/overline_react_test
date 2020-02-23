const sqlDrop = `DROP VIEW IF EXISTS vw_app_config`;
const sqlCreate = `CREATE VIEW vw_app_config AS
SELECT
  app_config.id,
  app_config.catId,
  app_config_categories.name AS catName,
  app_config.name,
  app_config.valueType,
  app_config.value,
  app_config.userSpecific,
  app_config.description,
	CAST(GREATEST(
		IFNULL(app_config.updatedAt, '2000-01-01'),
		IFNULL(app_config_categories.updatedAt, '2000-01-01')
  ) AS DATETIME) updatedAt,
  NOT ISNULL(app_config.deletedAt) AS isDeleted
FROM app_config
INNER JOIN app_config_categories ON app_config.catId = app_config_categories.id
`;

exports.up = knex => {
  return knex.schema.raw(sqlDrop).then(() => knex.schema.raw(sqlCreate));
};

exports.down = knex => {
  return knex.schema.raw(sqlDrop);
};
