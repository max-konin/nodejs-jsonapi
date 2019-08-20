'use strict';

const Hapi = require('@hapi/hapi'),
      config = require('@config/application'),
      apiRoutes = require('@api')

const server = Hapi.server({
  port: config.port,
  host: 'localhost'
});

server.route(apiRoutes);

exports.init = async () => {
  await server.initialize();

  return server;
};

exports.start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});