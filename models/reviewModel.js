const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'Review can not be Empty'],
      minlength: [20, 'Review must be greater than 20 characters.'],
    },
    rating: {
      type: Number,
      default: 4,
      min: 1,
      max: 5,
      require: [true, 'Rating is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      require: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'Review must belong to a user'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
