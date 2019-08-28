const validate = require('validate.js');

validate.formatters.jsonapi = function(errors) {
  return errors.map(function(error) {
    return {
      source: {
        pointer: `/data/attributes/${error.attribute}`
      },
      title: error.error
    };
  });
};

module.exports = (changeset, opts) => {
  if (opts.validation) {
    const errors = validate(changeset, opts.validation, { format: 'jsonapi' });
    if (errors) {
      return { valid: false, errors };
    } else {
      return { valid: true, changeset };
    }
  } else {
    return { valid: true, changeset };
  }
};
