const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAll(Review)

exports.setTourUserIds = (req,res,next)=>{
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

exports.createReview = factory.createDoc(Review)
exports.getReview = factory.getOne(Review)
exports.deleteReview = factory.deleteDoc(Review);
exports.updateReview = factory.updateDoc(Review)