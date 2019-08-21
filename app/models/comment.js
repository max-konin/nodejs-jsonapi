'use strict';

const { Model } = require('@config/bookshelf');

const Comment = Model.extend({
  tableName: 'comments',

  post() {
    this.belongsTo(require('@models/post'));
  }
});

module.exports = Comment;
