/**
 * Express configuration
 */

const express = require('express');
// const favicon = require('serve-favicon');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
// const errorHandler = require('errorhandler');
const path = require('path');
const config = require('./environment');

module.exports = function(app) {
  let env = app.get('env');

  app.set('views', config.root + '/build');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({
    limit: '4mb', // 100kb default is too small
    extended: false
  }));
  app.use(bodyParser.json({
      limit: '4mb' // 100kb default is too small
  }));
  app.use(methodOverride());
  app.use(cookieParser());

  if ('prod' === env) {
    // app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
    app.use(morgan('dev'));
  }

  if ('dev' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    // app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
    app.use(morgan('dev'));
    // app.use(errorHandler()); // Error handler - has to be last
  }
};