const mayBeValidate = require('@lib/json-api-resource/operations/validate');

module.exports = async (changeset, _request, opts) => {
  const validationResult = mayBeValidate(changeset, opts);
  console.log('CUSTOM OPERATION');
  if (validationResult.valid) {
    const record = new opts.model(changeset);
    // DO SOMETHING
    return record.save().then(record => ({ valid: true, record }));
  } else {
    return { valid: false, errors: validationResult.errors };
  }
};
