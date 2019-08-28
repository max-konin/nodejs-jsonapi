'use strict';

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'postgres',
      database: 'nodejs_jsonapi_test'
    },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' }
  },

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'postgres',
      database: 'nodejs_jsonapi_development'
    },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' }
  }
};
