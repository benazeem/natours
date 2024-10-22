const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `This {${req.originalUrl}} route does not exists on server`,
  // });

  // let err = new Error(
  //   `This {${req.originalUrl}} route does not exists on server`,
  // );
  // err.status = 'fail';
  // err.statusCode = 404;

  next(
    new AppError(
      `This {${req.originalUrl}} route does not exists on server`,
      404,
    ),
  );
});

app.use(globalErrorHandler);

module.exports = app;
