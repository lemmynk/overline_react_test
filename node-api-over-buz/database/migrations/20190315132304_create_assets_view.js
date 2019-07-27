const sqlDrop = `DROP VIEW IF EXISTS vw_assets`;
const sqlCreate = `CREATE VIEW vw_assets AS
SELECT
	assets.id,
    assets.assetCategoryId,
    asset_categories.name AS category,
    assets.fileId,
    files.fileName,
    assets.title,
    assets.slug,
    assets.description,
	CAST(GREATEST(
		IFNULL(assets.updatedAt, '2000-01-01'),
		IFNULL(asset_categories.updatedAt, '2000-01-01')
  ) AS DATETIME) updatedAt,
  NOT ISNULL(assets.deletedAt) isDeleted

FROM assets INNER JOIN asset_categories ON assets.assetCategoryId = asset_categories.id
LEFT JOIN files ON assets.fileId = files.id
`;

exports.up = knex => {
  return knex.schema.raw(sqlDrop).then(() => knex.schema.raw(sqlCreate));
};

exports.down = knex => {
  return knex.schema.raw(sqlDrop);
};
