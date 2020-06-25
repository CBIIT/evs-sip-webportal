const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const logger = require('morgan')


// const indexRouter = require('./routes/index')

module.exports = function(app) {
  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.resolve(__dirname, 'build')))

  // app.use('/api', indexRouter)
  app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname })
  })

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404))
  })

  // TODO: Add your own error handler here.
  if (process.env.NODE_ENV === 'production') {
    // Do not send stack trace of error message when in production
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.send('Error occurred while handling the request.')
    })
  } else {
    // Log stack trace of error message while in development
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      console.log(err)
      res.send(err.message)
    })
  }
}