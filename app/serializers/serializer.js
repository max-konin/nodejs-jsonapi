const JSONAPISerializer = require('json-api-serializer');
const commentSerialier = require('./comment');
const postSerialier = require('./post');

const Serializer = new JSONAPISerializer();

const defaultOptions = {
  convertCase: 'kebab-case',
  unconvertCase: 'camelCase'
};

const withDefaults = serializer =>
  Object.assign({}, defaultOptions, serializer);

Serializer.register('post', withDefaults(postSerialier));
Serializer.register('comment', withDefaults(commentSerialier));

module.exports = Serializer;
