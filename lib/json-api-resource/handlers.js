const Boom = require('boom');
const defaultIndexOperation = require('./operations/index');
const defaultShowOperation = require('./operations/show');
const defaultCreateOperation = require('./operations/create');

const serialize = (data, serializer) => serializer.serialize(data.toJSON());

module.exports = {
  buildIndexHandler: opts => {
    const { model, serializer } = opts;
    const operation = opts.indexOperation || defaultIndexOperation;
    return async request => {
      const results = await operation(model, request);
      return serialize(results, serializer);
    };
  },
  buildShowHandler: opts => {
    const { model, serializer } = opts;
    const operation = opts.showOperation || defaultShowOperation;
    return async request => {
      const record = await operation(model, request);
      if (record) {
        return serialize(record, serializer);
      } else {
        return Boom.notFound('not found');
      }
    };
  },
  buildCreateHandler: opts => {
    const { model, serializer } = opts;
    const operation = opts.createOperation || defaultCreateOperation;
    return async (request, h) => {
      const record = await operation(request, opts);
      return h.response(serialize(record, serializer)).code(201);
    };
  }
};
