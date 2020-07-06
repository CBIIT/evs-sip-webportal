var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV || 'dev',

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // Server port
  port: process.env.PORT || 3000,

  // Server IP
  // ip: process.env.IP || '0.0.0.0',

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, require('./' + all.env + '.js') || {});