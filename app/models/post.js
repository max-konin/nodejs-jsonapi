'use strict';

const { Model } = require('@config/bookshelf');

const Post = Model.extend({
  tableName: 'posts'
});

module.exports = Post;
