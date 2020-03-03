const KomConfig = require('../../models/KomConfig');

const vKoms = (req, res, next) => {
  KomConfig.vKoms()
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

module.exports = {
  vKoms,
};
