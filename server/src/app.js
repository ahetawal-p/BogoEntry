/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import Authentication from './auth/authentication';

mongoose.Promise = global.Promise;

export default class App {
  constructor(config) {
    this.port = config.port;
    this.db = config.db;
    this.express = express();
    this.auth = new Authentication();
    this.initialize();
  }

  initialize() {
    mongoose.connect(
      this.db,
      { useNewUrlParser: true, useCreateIndex: true }
    );
    mongoose.connection.on('error', error => console.log(error));
    mongoose.set('debug', true);

    this.auth.initialize();
    this.configureMiddleware();
    this.configureRoutes();
  }

  start() {
    this.express.listen(this.port, () =>
      console.log(`Listening to port ${this.port}`)
    );
  }

  configureMiddleware() {
    const expressApp = this.express;
    expressApp.use(logger('dev'));
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: false }));
    expressApp.use(cookieParser());
    const staticFiles = express.static(
      path.join(__dirname, '../../client/build')
    );
    expressApp.use(staticFiles);
  }

  configureRoutes() {
    const expressApp = this.express;
    // const staticFiles = express.static(
    //   path.join(__dirname, '../../client/build')
    // );
    // expressApp.use('/*', staticFiles);
    expressApp.use('/user', usersRouter);

    // catch 404 and forward to error handler
    expressApp.use((req, res, next) => {
      next(createError(404));
    });

    // error handler
    expressApp.use((err, req, res) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? {} : {};

      // render the error page
      res.status(err.status || 500);
      res.json({ error: err });
    });
  }
}
