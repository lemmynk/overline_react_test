const AppConfigUserView = require('../../models/AppConfigUserView');
const AppConfigView = require('../../models/AppConfigView');

const userSpecific = (req, queryParams) =>
  AppConfigUserView.findAll(req, queryParams);

const api = (req, res, next) => {
  const { query, auth, params } = req;
  const version = query.version || 0;
  const queryParams = {
    userId: auth.id,
  };

  // Combine allConfig with userSpecific config
  // with keeping version
  // we don't want user request to be timestamped
  Promise.all([
    AppConfigView.findAll(req, { ...params, version }),
    userSpecific({ query: queryParams }),
  ])
    .then(([allResponse, userResponse]) => {
      const { data: allData, version: allVersion } = allResponse;
      const allDataObj = allData.reduce(
        (acc, val) => ({ ...acc, [val.name]: AppConfigView.toValue(val) }),
        {},
      );
      const userDataObj = userResponse.reduce(
        (acc, val) => ({ ...acc, [val.name]: AppConfigView.toValue(val) }),
        {},
      );
      const data = { ...allDataObj, ...userDataObj };
      return { data, version: allVersion };
    })
    .then(response => res.json(response))
    .catch(err => next(err));
};

module.exports = {
  api,
};
