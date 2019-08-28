const buildJSONAPIResource = require('@lib/jsonapi-resource');
const createPostOperation = require('@operations/posts/create');

module.exports = [
  ...buildJSONAPIResource('post', {
    createOperation: createPostOperation,
    validation: {
      title: {
        presence: true
      },
      body: {
        presence: true
      }
    }
  }),
  ...buildJSONAPIResource('comment', {
    validation: {
      text: {
        presence: true
      },
      postId: {
        presence: true
      }
    }
  })
];
