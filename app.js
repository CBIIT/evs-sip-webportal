const express = require('express');
const config = require('./server/config');

// Setup server
const app = express();
// var server = require('http').createServer(app);
require('./server/config/express')(app);
// require('./routes')(app);
//require('./components/exchange');

// Start server
app.listen(config.port, config.ip, function () {
  console.log('Server listening on %d, in %s mode', config.port, config.env);
});

// Expose app
exports = module.exports = app;