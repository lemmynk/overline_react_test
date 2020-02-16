const { body, param } = require('express-validator');

const vArtiklEnum = ['roba', 'repro', 'gp', 'os', 'usluga'];

const validateStringLength = (field, max) =>
  body(field)
    .exists()
    .withMessage(`${field}.required`)
    .bail()
    .isLength({ min: 1, max })
    .withMessage(`${field}.length`);

const validateOptionalStringLength = (field, max) =>
  body(field)
    .optional()
    .isLength({ min: 1, max })
    .withMessage(`${field}.length`);

const validateBoolean = field =>
  body(field)
    .optional()
    .toBoolean();

const validateInteger = field =>
  body(field)
    .exists()
    .withMessage(`${field}.required`)
    .bail()
    .isInt()
    .withMessage(`${field}.invalid-format`);

const validateOptionalInteger = field =>
  body(field)
    .optional()
    .toInt();

const validateOptionalText = field =>
  body(field)
    .optional()
    .escape();

const validateParent = (field, ParentModel, forignKey = 'id') =>
  body(field)
    .exists()
    .withMessage(`${field}.required`)
    .bail()
    .isInt()
    .withMessage(`${field}.invalid-format`)
    .bail()
    .toInt()
    .custom(value =>
      ParentModel.count({ [forignKey]: value }).then(count => {
        if (count > 0) {
          return true;
        }
        return Promise.reject(new Error(`${field}.not-found`));
      }),
    );

const validateNoChildren = (paramName, ChildModel, foreignKey) =>
  param(paramName)
    .isInt()
    .withMessage('invalid-format')
    .bail()
    .toInt()
    .custom(value =>
      ChildModel.count({ [foreignKey]: value, isDeleted: false }).then(
        count => {
          if (count > 0) {
            return Promise.reject(new Error('not-empty'));
          }
          return true;
        },
      ),
    );

const validateVArtikl = () =>
  body('vArtikl')
    .exists()
    .withMessage('vArtikl.required')
    .bail()
    .isIn(vArtiklEnum)
    .withMessage('vArtikl.enum');

module.exports = {
  validateStringLength,
  validateOptionalStringLength,
  validateBoolean,
  validateInteger,
  validateOptionalInteger,
  validateOptionalText,
  validateParent,
  validateNoChildren,
  validateVArtikl,
};
