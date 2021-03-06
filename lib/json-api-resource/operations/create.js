const mayBeValidate = require('./validate');

module.exports = async (changeset, _request, opts) => {
  const validationResult = mayBeValidate(changeset, opts);
  if (validationResult.valid) {
    const record = new opts.model(changeset);
    return record.save().then(record => ({ valid: true, record }));
  } else {
    return { valid: false, errors: validationResult.errors };
  }
};
