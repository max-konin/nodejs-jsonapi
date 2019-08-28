'use strict';

const knexConfig = require('../knexfile');
const { environment } = require('./application');

const knex = require('knex')(knexConfig[environment]);

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('bookshelf-case-converter-plugin');

module.exports = bookshelf;
