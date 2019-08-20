const { factory } = require('factory-girl');
const Post = require('@models/post');

module.exports = () => {
  factory.define('Post', Post, {
    title: 'sometitle',
    body: 'sometext'
  });
};
