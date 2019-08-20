const mayBeValidate = (changeset, opts) => {
  if (opts.validation) {
    // TODO: implement validation;
    return { valid: true, changeset };
  } else {
    return { valid: true, changeset };
  }
};

module.exports = (request, opts) => {
  const changeset = opts.deserializer.deserialize(request.payload);
  const validationResult = mayBeValidate(changeset, opts);
  if (validationResult.valid) {
    const record = new opts.model(changeset);
    return record.save();
  } else {
    // TODO: serialize errors
    return null;
  }
};
