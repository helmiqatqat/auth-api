'use strict';
const server = require('./src/server');
const { db } = require('./src/models/index');

db.sync().then(() => {
  server.start(3003);
});
