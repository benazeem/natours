const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteDoc = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({ _id: req.params.id });
    console.log('Enter in delete factory');
    if (!doc) {
      return next(
        new AppError(`No document exists with this (${req.params.id}) id`, 404),
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

  exports.updateDoc = Model => 
    catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        return next(new AppError(`This (${req.params.id}) id is invalid`, 404));
      }
      res.status(200).json({
        status: 'success',
        data: { 
          data: doc },
      });
    });
  
  exports.createDoc = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
     data: doc
      },
    });
  });


exports.getOne = (Model,popOptions) => catchAsync( async(req,res,next)=>{
  let query = Model.findById(req.params.id)
  if(popOptions) query = query.populate(popOptions)
  const doc = await query;

  if(!doc) return next(new AppError('No Document focund with that ID', 400));

  res.status(200).json({
    status:'success',
    data:{
      data: doc
    }
  })
} )

exports.getAll = Model => catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours,
  });
});