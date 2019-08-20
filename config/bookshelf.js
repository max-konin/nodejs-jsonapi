'use strict';

var knexConfig = require('../knexfile');
var { environment } = require('./application');

var knex = require('knex')(knexConfig[environment]);

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
