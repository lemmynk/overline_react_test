const KomView = require('../../models/KomView');

const self = {
  all: (req, res, next) => {
    KomView.findAll({}, req.query)
      .then(response => {
        const { data: raw, version } = response;
        const data = raw.map(item => ({
          ...item,
          pdvObveznik: item.pdvObveznik === 1,
          isKupac: item.isKupac === 1,
          isDobavljac: item.isDobavljac === 1,
          isFirma: item.isFirma === 1,
          isSuspended: item.isSuspended === 1,
          isDeleted: item.isDeleted === 1,
        }));
        return { data, version };
      })
      .then(response => res.json(response))
      .catch(err => next(err));
  },
};

module.exports = self;
