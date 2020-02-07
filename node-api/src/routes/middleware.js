const multer = require('multer');
const User = require('../models/User');
// const Device =  require('../models/Device');
const { tokenizer, decoder } = require('../utils');
const { UnauthorizedUserError, NoRecordsFoundError } = require('../errors');

// const pkce = (req, res, next) => {
//   tokenizer
//     .validate(req, res, next)
//     .then(payload => payload.sub)
//     .then(sub => decoder.decrypt(sub))
//     .then(uuid => Device.find({ uuid }))
//     .then(device => {
//       req.auth = device.toWhoAmI();
//     })
//     .then(() => next())
//     .catch(err => {
//       if (err instanceof NoRecordsFoundError)
//         throw new UnauthorizedUserError('Device does not exist');
//       throw err;
//     })
//     .catch(err => next(err));
// };

const user = (req, res, next) => {
  tokenizer
    .validate(req, res, next)
    .then(payload => payload.sub)
    .then(sub => decoder.decrypt(sub))
    .then(uuid => User.find({ uuid }))
    .then(model => {
      req.auth = model.toWhoAmI();
    })
    .then(() => next())
    .catch(err => {
      if (err instanceof NoRecordsFoundError)
        throw new UnauthorizedUserError('User does not exist');
      throw err;
    })
    .catch(err => next(err));
};

/*
 |-------------------------------------------------------------------------------
 | FILE UPLOAD
 |-------------------------------------------------------------------------------
 */
const {
  ASSETS_UPLOAD_LIMIT,
  ASSETS_UPLOAD_FIELDNAME,
  ASSETS_UPLOAD_PATH,
} = process.env;
const limits = { fileSize: parseInt(ASSETS_UPLOAD_LIMIT, 10) };
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ASSETS_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadString = multer({ limits }).single(ASSETS_UPLOAD_FIELDNAME);
const uploadStore = multer({ storage, limits }).single(ASSETS_UPLOAD_FIELDNAME);

module.exports = {
  user,

  uploadString,
  uploadStore,
};
