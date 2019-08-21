'use strict';

const { Model } = require('@config/bookshelf');

const Post = Model.extend({
  tableName: 'posts',

  comments() {
    this.hasMany(require('@models/comment'));
  }
});

module.exports = Post;
