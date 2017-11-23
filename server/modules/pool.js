var pg = require('pg');

var config = {
    database: 'to_do',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMilles: 30000, 
  }
  
  var pool = new pg.Pool(config)

  module.exports = pool;