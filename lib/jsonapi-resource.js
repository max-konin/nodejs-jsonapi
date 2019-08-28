const pluralize = require('pluralize');
const handlers = require('./json-api-resource/handlers');

function buildOptsWithDefault(resourceName, opts) {
  const Model = require(`@models/${resourceName}`);
  return {
    resourceName,
    model: Model,
    ...opts
  };
}

function buildJSONAPIResource(resourceName, opts = {}) {
  const path = opts.path || '/' + pluralize(resourceName);
  const optsWithDefault = buildOptsWithDefault(resourceName, opts);
  return [
    {
      method: 'GET',
      path,
      handler: handlers.buildIndexHandler(optsWithDefault)
    },
    {
      method: 'GET',
      path: `${path}/{recordId}`,
      handler: handlers.buildShowHandler(optsWithDefault)
    },
    {
      method: 'POST',
      path,
      handler: handlers.buildCreateHandler(optsWithDefault)
    }
  ];
}

module.exports = buildJSONAPIResource;
