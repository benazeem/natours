const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get Tour data from collection
  const tours = await Tour.find();
  // 2) Build Template
  // 3) Render the template using tour data from

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('No tour found with that name', 404));
  }
  // const reviews = await Review.find({ tour: tour.id });
  // const guides = await User.find({ _id: { $in: tour.guides } });

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'User Login',
  });
};
