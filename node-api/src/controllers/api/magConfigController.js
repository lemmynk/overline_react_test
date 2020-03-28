const MagConfig = require('../../models/MagConfig');

const vPromets = (req, res, next) => {
  MagConfig.vPromets()
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

const defaultVPromet = (req, res, next) => {
  MagConfig.defaultVPromet()
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

module.exports = {
  defaultVPromet,
  vPromets,
};
