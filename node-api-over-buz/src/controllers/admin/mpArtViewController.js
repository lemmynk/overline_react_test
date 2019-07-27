const ArtView = require('../../models/ArtView');

const self = {
  all: (req, res, next) => {
    ArtView.findAll({}, req.query)
      .then(response => {
        const { data: raw, version } = response;
        const data = raw.map(item => ({
          ...item,
          isDeleted: item.isDeleted === 1,
        }));
        return { data, version };
      })
      .then(response => res.json(response))
      .catch(err => next(err));
  },
};

module.exports = self;
