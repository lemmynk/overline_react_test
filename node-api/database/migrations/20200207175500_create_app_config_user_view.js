const sqlDrop = `DROP VIEW IF EXISTS vw_app_config_user`;
const sqlCreate = `CREATE VIEW vw_app_config_user AS
SELECT
  app_config_user.id,
  app_config_user.userId,
  app_config_user.appConfigId,
	app_config.name,
  app_config.valueType,
  app_config_user.value,
  app_config.userSpecific,
  app_config.description,
	CAST(GREATEST(
		IFNULL(app_config_user.updatedAt, '2000-01-01'),
		IFNULL(app_config.updatedAt, '2000-01-01')
  ) AS DATETIME) AS updatedAt,
  NOT ISNULL(app_config_user.deletedAt) AS isDeleted
FROM app_config_user INNER JOIN app_config ON app_config_user.appConfigId = app_config.id
`;

exports.up = knex => {
  return knex.schema.raw(sqlDrop).then(() => knex.schema.raw(sqlCreate));
};

exports.down = knex => {
  return knex.schema.raw(sqlDrop);
};
