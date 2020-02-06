const validator = {
  validateRequired: (model, props, params) => {
    props.forEach(prop => {
      if (typeof params[prop] === 'undefined') {
        model.addValidationError(prop, `${prop} parameter missing`);
      }
    });
  },

  validateStringLength: (model, params, prop, maxLength = 0) => {
    const value = params[prop];
    if (value && value.length && value.length > maxLength) {
      model.addValidationError(
        prop,
        `${prop} length is greater than ${maxLength}`,
      );
    }
  },
};

module.exports = validator;
