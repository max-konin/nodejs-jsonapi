const knexCleaner = require('knex-cleaner');
const bookshelf = require('@config/bookshelf');
const Lab = require('@hapi/lab');
const { beforeEach, afterEach } = (exports.lab = Lab.script());

module.exports = async () => {
  await knexCleaner.clean(bookshelf.knex);
};
