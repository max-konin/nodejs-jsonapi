const buildJSONAPIResource = require('@lib/jsonapi-resource');

module.exports = [
  ...buildJSONAPIResource('post'),
  ...buildJSONAPIResource('comment')
];
