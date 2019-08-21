const { factory } = require('factory-girl');
const Post = require('@models/post');
const Comment = require('@models/comment');

factory.define('Post', Post, {
  title: 'sometitle',
  body: 'sometext'
});

factory.define('Comment', Comment, {
  text: 'some comment'
});
