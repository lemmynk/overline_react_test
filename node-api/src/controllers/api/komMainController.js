const KomMain = require('../../models/KomMain');

const nextSifra = (req, res, next) => {
  const { query } = req;
  const { vKom } = query;
  KomMain.nextSifra(vKom)
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

module.exports = {
  nextSifra,
};
