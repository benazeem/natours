const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const Tour = require('./models/tourModel');
const { title } = require('process');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); //Serve static files

//GLOBAL MIDDLEWARES
app.use(helmet()); //Set Security HTTP Headers
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //Development Logging
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too manyrequests from this IP, please try again in an hour!',
});

app.use('/api', limiter); //Request limit
app.use(express.json({ limit: '10kb' })); //Body Parser, reading data from body into req.body
app.use(cookieParser());

//Data Sanitization against NoSQL query injection
app.use(mongoSanitize());
//Data Sanitization against XSS
app.use(xss());
// Preventing parameter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

//Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

//ROUTES

app.use('/', viewRouter);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
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
