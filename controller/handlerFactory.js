const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

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
