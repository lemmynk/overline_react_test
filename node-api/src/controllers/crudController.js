const { validationResult } = require('express-validator');
const { ValidationError } = require('../errors');

/* FindAll functions */
const doFindAllRequest = (
  Model,
  parentKey,
  whereByQueryType,
  defaultParams,
) => (req, res, next) => {
  const { params } = req;

  const parentKeyParams = {};
  if (parentKey && typeof parentKey === 'string') {
    parentKeyParams[parentKey] = params[parentKey];
  }

  const paramsByRoute =
    parentKey && typeof parentKey === 'object' ? parentKey : {};

  const queryParams = {
    ...parentKeyParams,
    ...whereByQueryType,
    ...paramsByRoute,
    ...defaultParams,
  };

  Model.findAll(req, queryParams)
    .then(response => res.json(response))
    .catch(err => next(err));
};

const findAllByVersion = (Model, parentKey, defaultParams) => {
  return doFindAllRequest(Model, parentKey, { version: 1 }, defaultParams);
};

const findAllPaginated = (Model, parentKey, defaultParams) => {
  return doFindAllRequest(Model, parentKey, { page: 1 }, defaultParams);
};

const formatErrors = errors => {
  const output = {};

  errors.forEach(error => {
    const { param, msg } = error;
    output[param] = output[param] ? [...output[param], msg] : [msg];
  });

  return output;
};

const self = (Model, parentKey = null, defaultParams = {}) => ({
  /* FindAll */
  allByVersion: findAllByVersion(Model, parentKey, defaultParams),
  allPaginated: findAllPaginated(Model, parentKey, defaultParams),
  all: doFindAllRequest(Model, parentKey, {}, defaultParams),

  /* Item specific CRUD routes */
  find: (req, res, next) => {
    const { params } = req;
    const { id } = params;
    Model.find(id)
      .then(model => res.json(model.attrs()))
      .catch(err => next(err));
  },

  create: (req, res, next) => {
    const { body, params } = req;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(formatErrors(errors.array()));
      // return res.status(422).json({ errors: errors.array() });
    }

    if (parentKey && typeof parentKey === 'string' && !body[parentKey]) {
      body[parentKey] = params[parentKey];
    }
    Model.create(body)
      .then(response => response.id)
      .then(id => res.status(201).json({ id }))
      .catch(err => next(err));
  },

  update: (req, res, next) => {
    const { params, body } = req;
    const { id } = params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(formatErrors(errors.array()));
      // return res.status(422).json({ errors: errors.array() });
    }

    if (parentKey && typeof parentKey === 'string' && !body[parentKey]) {
      body[parentKey] = params[parentKey];
    }
    Model.find(id)
      .then(model => model.fill(body).save())
      .then(() => res.status(204).end())
      .catch(err => next(err));
  },

  delete: (req, res, next) => {
    const { params } = req;
    const { id } = params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError({
        errors: errors.array().map(err => err.msg),
      });
      // throw new ValidationError(formatErrors(errors.array()));
      // return res.status(422).json({ errors: errors.array() });
    }

    Model.find(id)
      .then(model => model.delete())
      .then(() => res.status(204).end())
      .catch(err => next(err));
  },

  /*
   |----------------------------------------------------------------------
   | POSITION ROUTES
   |----------------------------------------------------------------------
   */
  moveToTop: (req, res, next) => {
    const { params } = req;
    const { id } = params;

    Model.find(id)
      .then(model => model.moveToTop())
      .then(() => res.status(204).end())
      .catch(err => next(err));
  },
  moveUp: (req, res, next) => {
    const { params } = req;
    const { id } = params;

    Model.find(id)
      .then(model => model.moveUp())
      .then(() => res.status(204).end())
      .catch(err => next(err));
  },
  moveDown: (req, res, next) => {
    const { params } = req;
    const { id } = params;

    Model.find(id)
      .then(model => model.moveDown())
      .then(() => res.status(204).end())
      .catch(err => next(err));
  },
  moveToBottom: (req, res, next) => {
    const { params } = req;
    const { id } = params;

    Model.find(id)
      .then(model => model.moveToBottom())
      .then(() => res.status(204).end())
      .catch(err => next(err));
  },
});

module.exports = self;
