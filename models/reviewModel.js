const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'Review can not be Empty'],
      minlength: [5, 'Review must be greater than 5 characters.'],
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

reviewSchema.index({tour:1, user:1}, {unique:true}); 

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([{
    $match:{tour:tourId}
  },{
$group:{
  _id:`$tour`,
  nRating: {$sum :1},
  averageRating: {$avg: `$rating`}
}}])

if(stats.length>0){
await Tour.findByIdAndUpdate(tourId, {
  ratingsAverage:stats[0].averageRating,
  ratingsQuantity:stats[0].nRating
})
}else await Tour.findByIdAndUpdate(tourId,{
  ratingsQuantity: 0,
  ratingsAverage:4.5
})

}

reviewSchema.post('save', function(){
 this.constructor.calcAverageRatings(this.tour)
})

reviewSchema.pre(/^findOneAnd/, async function(next){
  this.r = await await this.model.findOne(this.getQuery());
  next()
})

reviewSchema.post(/^findOneAnd/, async function(){
await this.r.constructor.calcAverageRatings(this.r.tour)
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
