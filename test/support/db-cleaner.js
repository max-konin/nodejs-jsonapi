const knexCleaner = require('knex-cleaner');
const bookshelf = require('@config/bookshelf');
const Lab = require('@hapi/lab');

module.exports = async () => {
  await knexCleaner.clean(bookshelf.knex);
};
