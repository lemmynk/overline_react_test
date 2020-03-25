/**
 * Validator.js
 * https://github.com/validatorjs/validator.js#validators
 */
const { body, param } = require('express-validator');

const vArtiklEnum = ['roba', 'repro', 'gp', 'os', 'usluga'];
const vPrometEnum = ['vp', 'mp', 'repro', 'os', 'gp', 'usluga'];

/*
 |---------------------------------------------------------------
 | STRING
 |---------------------------------------------------------------
 */
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
    .isLength({ min: 0, max })
    .withMessage(`${field}.length`);

const validateOptionalText = field =>
  body(field)
    .optional()
    .escape();

/*
 |---------------------------------------------------------------
 | BOOLEAN
 |---------------------------------------------------------------
 */
const validateBoolean = field =>
  body(field)
    .optional()
    .toBoolean();

/*
 |---------------------------------------------------------------
 | INTEGER
 |---------------------------------------------------------------
 */
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

/*
 |---------------------------------------------------------------
 | DATE
 |---------------------------------------------------------------
 */
const validateDate = field =>
  body(field)
    .exists()
    .withMessage(`${field}.required`)
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage(`${field}.length`)
    .toDate();

const validateOptionalDate = field =>
  body(field)
    .optional()
    .isLength({ min: 0, max: 10 })
    .withMessage(`${field}.length`)
    .toDate();

/*
 |---------------------------------------------------------------
 | RELATIONS
 |---------------------------------------------------------------
 */
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

/*
 |---------------------------------------------------------------
 | DB SPECIFIC
 |---------------------------------------------------------------
 */
const validateVArtikl = () =>
  body('vArtikl')
    .exists()
    .withMessage('vArtikl.required')
    .bail()
    .isIn(vArtiklEnum)
    .withMessage('vArtikl.enum');

const validateVPromet = () =>
  body('vPromet')
    .exists()
    .withMessage('vPromet.required')
    .bail()
    .isIn(vPrometEnum)
    .withMessage('vPromet.enum');

module.exports = {
  validateStringLength,
  validateOptionalStringLength,
  validateOptionalText,
  validateBoolean,
  validateInteger,
  validateOptionalInteger,
  validateDate,
  validateOptionalDate,
  validateParent,
  validateNoChildren,
  validateVArtikl,
  validateVPromet,
};
