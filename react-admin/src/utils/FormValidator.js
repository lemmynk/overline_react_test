// @flow

export const VALIDATION_RULES_SEPARATOR = '|';
export const VALIDATION_RULE_REQUIRED = 'required';
export const VALIDATION_RULE_STRING = 'string';
export const VALIDATION_RULE_NUMBER = 'number';
export const VALIDATION_RULE_BOOLEAN = 'boolean';
export const VALIDATION_RULE_OBJECT = 'object';
export const VALIDATION_RULE_ARRAY = 'array';

export const ERROR_MESSAGE_REQUIRED = 'ERROR_MESSAGE_REQUIRED';
export const ERROR_MESSAGE_STRING_TYPE = 'stringType error';
export const ERROR_MESSAGE_NUMBER_TYPE = 'numberType error';
export const ERROR_MESSAGE_OBJECT_TYPE = 'objectType error';
export const ERROR_MESSAGE_ENUM_VALUE = 'enumValue error';
export const ERROR_MESSAGE_MIN_LENGTH_VALUE = 'minLength error';
export const ERROR_MESSAGE_MAX_LENGTH_VALUE = 'maxLength error';
export const ERROR_MESSAGE_MIN_VALUE = 'min value error';
export const ERROR_MESSAGE_MAX_VALUE = 'max value error';

export const errorMessages = {
  ERROR_MESSAGE_REQUIRED: '{{propName}} missing',
  ERROR_MESSAGE_STRING_TYPE: '{{propName}} must be String',
  ERROR_MESSAGE_NUMBER_TYPE: '{{propName}} must be Number',
  ERROR_MESSAGE_OBJECT_TYPE: '{{propName}} must be Object',
  ERROR_MESSAGE_ENUM_VALUE: '{{propName}} must be one of [{{values}}]',
  ERROR_MESSAGE_MIN_LENGTH_VALUE:
    '{{propName}} length must be greater or equal than {{value}}',
  ERROR_MESSAGE_MAX_LENGTH_VALUE:
    '{{propName}} length must be less or equal than {{value}}',
  ERROR_MESSAGE_MIN_VALUE:
    '{{propName}} value must be greater or equal than {{value}}',
  ERROR_MESSAGE_MAX_VALUE:
    '{{propName}} value must be less or equal than {{value}}',
};
const formatErrorMessage = (errKey: string, i18nParams: Object) => {
  let msg = errorMessages[errKey];
  Object.keys(i18nParams).forEach(key => {
    msg = msg.replace(`{{${key}}}`, i18nParams[key]);
  });
  return msg;
};

class FormValidator {
  rules: Object;

  errors: Object;

  t: any;

  constructor(rules: Object = {}) {
    this.rules = rules;
    this.errors = {};
  }

  static withRules(rules: Object) {
    return new FormValidator(rules);
  }

  withTranslation(t: any) {
    this.t = t;
    return this;
  }

  /*
   |----------------------------------------------------------------------------------
   | CLASS HELPER METHODS
   |----------------------------------------------------------------------------------
   */

  addError(propName: string, errKey: string, i18nParams: Object = {}) {
    const msg = this.t
      ? this.t(`errors.${errKey}`, i18nParams)
      : formatErrorMessage(errKey, i18nParams);
    if (this.errors[propName]) {
      this.errors[propName] = [...this.errors[propName], msg];
    } else {
      this.errors[propName] = [msg];
    }
  }

  ruleParts(propName: string) {
    return Object.keys(this.rules).includes(propName)
      ? this.rules[propName].split(VALIDATION_RULES_SEPARATOR)
      : [];
  }

  getEnumValueRule(propName: string) {
    return this.ruleParts(propName)
      .filter(rule => rule.substring(0, 3) === 'in:')
      .shift();
  }

  getMinRule(propName: string) {
    return this.ruleParts(propName)
      .filter(rule => rule.substring(0, 4) === 'min:')
      .shift();
  }

  getMaxRule(propName: string) {
    return this.ruleParts(propName)
      .filter(rule => rule.substring(0, 4) === 'max:')
      .shift();
  }

  /*
   |----------------------------------------------------------------------------------
   | CHECK SHOULD RULE BE APPLIED
   |----------------------------------------------------------------------------------
   */
  shouldCheckRequired(propName: string) {
    return this.ruleParts(propName).includes(VALIDATION_RULE_REQUIRED);
  }

  shouldCheckStringType(propName: string) {
    return this.ruleParts(propName).includes(VALIDATION_RULE_STRING);
  }

  shouldCheckNumberType(propName: string) {
    return this.ruleParts(propName).includes(VALIDATION_RULE_NUMBER);
  }

  shouldCheckObjectType(propName: string) {
    return this.ruleParts(propName).includes(VALIDATION_RULE_OBJECT);
  }

  shouldCheckEnumValue(propName: string) {
    return this.getEnumValueRule(propName);
  }

  shouldCheckMinLengthValue(propName: string) {
    return this.shouldCheckStringType(propName) && this.getMinRule(propName);
  }

  shouldCheckMaxLengthValue(propName: string) {
    return this.shouldCheckStringType(propName) && this.getMaxRule(propName);
  }

  shouldCheckMinValue(propName: string) {
    return this.shouldCheckNumberType(propName) && this.getMinRule(propName);
  }

  shouldCheckMaxValue(propName: string) {
    return this.shouldCheckNumberType(propName) && this.getMaxRule(propName);
  }

  /*
   |----------------------------------------------------------------------------------
   | PROCESS RULE VALIDATION
   |----------------------------------------------------------------------------------
   */
  doValidateRequired(propName: string, value: any) {
    if (!value) {
      this.addError(propName, 'ERROR_MESSAGE_REQUIRED', { propName });
    }
  }

  doValidateStringType(propName: string, value: any) {
    if (value && typeof value === 'object') {
      this.addError(propName, 'ERROR_MESSAGE_STRING_TYPE', { propName });
    }
  }

  doValidateNumberType(propName: string, value: any) {
    if (value && Number.isNaN(parseFloat(value))) {
      this.addError(propName, 'ERROR_MESSAGE_NUMBER_TYPE', { propName });
    }
  }

  doValidateObjectType(propName: string, value: any) {
    if (value && typeof value !== 'object') {
      this.addError(propName, 'ERROR_MESSAGE_OBJECT_TYPE', { propName });
    }
  }

  doValidateEnumValue(propName: string, value: any) {
    const enumRule = this.getEnumValueRule(propName);
    const enumValuesStr = enumRule.substring(3).trim();
    const enumValues = enumValuesStr.split(',').map(item => item.trim());
    if (value && !enumValues.includes(value)) {
      this.addError(propName, 'ERROR_MESSAGE_ENUM_VALUE', {
        propName,
        values: enumValuesStr,
      });
    }
  }

  doValidateMinLengthValue(propName: string, value: any) {
    const minRule = this.getMinRule(propName);
    const minValueStr = minRule.substring(4).trim();
    const minValue = parseInt(minValueStr, 10);
    if (!value || (value && value.length && value.length < minValue)) {
      this.addError(propName, 'ERROR_MESSAGE_MIN_LENGTH_VALUE', {
        propName,
        value: minValue,
      });
    }
  }

  doValidateMaxLengthValue(propName: string, value: any) {
    const maxRule = this.getMaxRule(propName);
    const maxValueStr = maxRule.substring(4).trim();
    const maxValue = parseInt(maxValueStr, 10);
    if (value && value.length && value.length > maxValue) {
      this.addError(propName, 'ERROR_MESSAGE_MAX_LENGTH_VALUE', {
        propName,
        value: maxValue,
      });
    }
  }

  doValidateMinValue(propName: string, value: any) {
    const minRule = this.getMinRule(propName);
    const minValueStr = minRule.substring(4).trim();
    const minValue = parseFloat(minValueStr);
    const testValue = parseFloat(value);
    if (
      !Number.isNaN(minValue) &&
      !Number.isNaN(testValue) &&
      testValue < minValue
    ) {
      this.addError(propName, 'ERROR_MESSAGE_MIN_VALUE', {
        propName,
        value: minValue,
      });
    }
  }

  doValidateMaxValue(propName: string, value: any) {
    const maxRule = this.getMaxRule(propName);
    const maxValueStr = maxRule.substring(4).trim();
    const maxValue = parseFloat(maxValueStr);
    const testValue = parseFloat(value);
    if (
      !Number.isNaN(maxValue) &&
      !Number.isNaN(testValue) &&
      testValue > maxValue
    ) {
      this.addError(propName, 'ERROR_MESSAGE_MAX_VALUE', {
        propName,
        value: maxValue,
      });
    }
  }

  /*
   |----------------------------------------------------------------------------------
   | VALIDATION METHODS
   |----------------------------------------------------------------------------------
   */
  validateProp(propName: string, value: any) {
    const err = null;

    if (this.shouldCheckRequired(propName)) {
      this.doValidateRequired(propName, value);
    }

    if (this.shouldCheckStringType(propName)) {
      this.doValidateStringType(propName, value);
    }

    if (this.shouldCheckNumberType(propName)) {
      this.doValidateNumberType(propName, value);
    }

    if (this.shouldCheckObjectType(propName)) {
      this.doValidateObjectType(propName, value);
    }

    if (this.shouldCheckEnumValue(propName)) {
      this.doValidateEnumValue(propName, value);
    }

    if (this.shouldCheckMinLengthValue(propName)) {
      this.doValidateMinLengthValue(propName, value);
    }

    if (this.shouldCheckMaxLengthValue(propName)) {
      this.doValidateMaxLengthValue(propName, value);
    }

    if (this.shouldCheckMinValue(propName)) {
      this.doValidateMinValue(propName, value);
    }

    if (this.shouldCheckMaxValue(propName)) {
      this.doValidateMaxValue(propName, value);
    }

    if (err) {
      this.errors[propName] = err;
    }
  }

  validate(formData: Object, cb: Object => void) {
    this.errors = {};

    Object.keys(this.rules).forEach(key => {
      this.validateProp(key, formData[key]);
    });

    if (cb) {
      cb(this.formatValidationErrors());
    }
    return Object.keys(this.errors).length === 0;
  }

  formatValidationErrors() {
    return this.errors;
  }

  validationErrors() {
    return this.formatValidationErrors();
  }
}

export default FormValidator;
