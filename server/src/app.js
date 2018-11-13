import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, '../../views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles);

app.use('/*', staticFiles);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // Index route
// app.get('/', (req, res) => {
//   res.send('Invalid endpoint!');
// });

app.listen(process.env.PORT || 3001, () => console.log('Listening to port 3001'));
