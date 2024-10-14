const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have Name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    require: [true, 'A tour must have duration'],
  },
  maxGroupSize: {
    type: Number,
    require: [true, ' A group size is required'],
  },
  difficulty: {
    type: String,
    require: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have Price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    require: [true, ' A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
