'use strict';

// Defaults that you access when you require this config.
module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,

  environment: process.env.NODE_ENV || 'development'
};
