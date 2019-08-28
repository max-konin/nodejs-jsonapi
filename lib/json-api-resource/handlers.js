const Boom = require('boom');
const defaultIndexOperation = require('./operations/index');
const defaultShowOperation = require('./operations/show');
const defaultCreateOperation = require('./operations/create');
const serializer = require('@serializers/serializer');

const serialize = (data, resourceName) =>
  serializer.serialize(resourceName, data.toJSON());

module.exports = {
  buildIndexHandler: opts => {
    const { model, resourceName } = opts;
    const operation = opts.indexOperation || defaultIndexOperation;
    return async request => {
      const results = await operation(model, request);
      return serialize(results, resourceName);
    };
  },
  buildShowHandler: opts => {
    const { model, resourceName } = opts;
    const operation = opts.showOperation || defaultShowOperation;
    return async request => {
      const record = await operation(model, request);
      if (record) {
        return serialize(record, resourceName);
      } else {
        return Boom.notFound('not found');
      }
    };
  },
  buildCreateHandler: opts => {
    const { resourceName } = opts;
    const operation = opts.createOperation || defaultCreateOperation;
    return async (request, h) => {
      const changeset = serializer.deserialize(resourceName, request.payload);
      const result = await operation(changeset, request, opts);
      if (result.valid) {
        return h.response(serialize(result.record, resourceName)).code(201);
      } else {
        return h.response({ errors: result.errors }).code(422);
      }
    };
  }
};
