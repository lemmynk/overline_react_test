const Period = require('../../models/Period');

const getDefault = (req, res, next) => {
  Period.getDefault()
    .then(data => res.json(data))
    .catch(err => next(err));
};

module.exports = {
  getDefault,
};
