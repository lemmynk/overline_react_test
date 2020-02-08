import baseWhereQuery from './where';
import { env } from '../../utils';

const buildPagination = (currentPage, perPage, totalItems) => ({
  currentPage,
  perPage,
  totalItems,
});

/**
 * Find all by version
 */
const findAllByVersion = (model, queryParams) => {
  const db = model.db();
  const { v, version: reqVersion } = queryParams;
  const byVersion = parseInt(v || reqVersion, 10);

  const dataQuery = baseWhereQuery(model, queryParams);

  // Apply versioning
  if (model.has('updatedAt')) {
    dataQuery.where(db.raw('UNIX_TIMESTAMP(updatedAt) > ?', [byVersion]));
  } else if (model.has('createdAt')) {
    dataQuery.where(db.raw('UNIX_TIMESTAMP(createdAt) > ?', [byVersion]));
  }

  const versionQuery = baseWhereQuery(model, queryParams);

  if (model.has('updatedAt')) {
    versionQuery.select(
      db.raw('MAX(UNIX_TIMESTAMP(updatedAt)) AS unixVersion'),
    );
  } else {
    versionQuery.select(
      db.raw('MAX(UNIX_TIMESTAMP(createdAt)) AS unixVersion'),
    );
  }
  const versionQueryPromise = versionQuery
    .then(response => response.shift())
    .then(response => response.unixVersion || 0);

  return Promise.all([dataQuery, versionQueryPromise]).then(
    ([data, version]) => ({
      data,
      version,
    }),
  );
};

/**
 * Find all with pagination
 */
const findAllPaginated = (model, queryParams) => {
  const { page, perPage: reqPerPage, orderBy: reqOrderBy } = queryParams;
  const currentPage = parseInt(page, 10);
  const perPage = parseInt(reqPerPage || env.defaultPerPage(), 10);
  const offset = (currentPage - 1) * perPage;
  const orderBy = reqOrderBy || 'id';

  const dataQuery = baseWhereQuery(model, queryParams)
    .orderByRaw(orderBy)
    .limit(perPage)
    .offset(offset);

  const countQuery = baseWhereQuery(model, queryParams)
    .count({
      c: model.primaryKey,
    })
    .then(response => response.shift())
    .then(response => response.c);

  return Promise.all([dataQuery, countQuery]).then(([data, totalItems]) => ({
    data,
    pagination: buildPagination(currentPage, perPage, totalItems),
  }));
};

const baseFindAll = (model, queryParams) => {
  const { orderBy } = queryParams;

  return baseWhereQuery(model, queryParams).orderByRaw(orderBy || 'id');
};

/**
 * Find all Router
 */
const findAll = (model, req, queryParams = {}) => {
  const { query: reqQuery } = req;
  const query = { ...queryParams, ...reqQuery };
  const { page, v, version } = query;
  if (typeof v !== 'undefined' || typeof version !== 'undefined') {
    return findAllByVersion(model, query);
  }

  // Add isDeleted query if not set not to
  const withoutDeletedParams =
    model.withDeleted === true ? {} : model.withoutDeletedQueryParam();

  const finalQueryParams = { ...query, ...withoutDeletedParams };

  if (typeof page !== 'undefined') {
    return findAllPaginated(model, finalQueryParams);
  }
  return baseFindAll(model, finalQueryParams);
};

module.exports = findAll;
