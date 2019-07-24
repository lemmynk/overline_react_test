const { Model } = require('@newtash/node-api-core');

const modelConfig = {
  tableName: 'vw_cng_images',
  keys: [
    'id',
    'cngId',
    'assetId',
    'assetTitle',
    'assetSlug',
    'assetFileName',
    'position',
    'isLive',
    'updatedAt',
    'isDeleted',
  ],
};

class CngView extends Model {
  constructor(props) {
    super(props, modelConfig);
  }
}

module.exports = CngView;
