const ArtView = require('../../models/ArtView');

const self = {
  all: (req, res, next) => {
    ArtView.findAll({ isDeleted: 0 }, { page: 1, ...req.query })
      .then(response => res.json(response))
      .catch(err => next(err));
  },
  allByType: vArtikl => (req, res, next) => {
    ArtView.findAll({ isDeleted: 0, vArtikl }, { page: 1, ...req.query })
      .then(response => res.json(response))
      .catch(err => next(err));
  },
  search: vArtikl => (req, res, next) => {
    ArtView.search(vArtikl, req.query)
      .then(response => res.json(response))
      .catch(err => next(err));
  },
};

module.exports = self;
