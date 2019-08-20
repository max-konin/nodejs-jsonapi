const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

const attributes = ['title', 'body'];

const Serializer = new JSONAPISerializer('posts', { attributes });
const Deserializer = new JSONAPIDeserializer('posts', { attributes });

module.exports = {
  Serializer,
  Deserializer
};
