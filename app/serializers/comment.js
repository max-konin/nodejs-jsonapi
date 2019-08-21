const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

const attributes = ['text'];

const Serializer = new JSONAPISerializer('comments', { attributes });
const Deserializer = new JSONAPIDeserializer('comments', { attributes });

module.exports = {
  Serializer,
  Deserializer
};
