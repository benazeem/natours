const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    length: reviews.length,
    data: {
      reviews,
    },
  });

  next();
});

exports.setTourUserIds = (req,res,next)=>{
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

exports.createReview = factory.createDoc(Review)

exports.deleteReview = factory.deleteDoc(Review);
exports.updateReview = factory.updateDoc(Review)