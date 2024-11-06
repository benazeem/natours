const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = factory.getAll(User)
// exports.postUser = factory.createDoc(User)
exports.getUser = factory.getOne(User)
exports.deleteUser = factory.deleteDoc(User);
exports.updateUser = factory.updateDoc(User);
exports.getMe = async (req,res,next) =>{
  req.params.id = req.user.id;
  next()
}

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Create error if user try to post password

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updatePassword',
        400,
      ),
    );
  }

  //2) Filter unwanted data from the body
  const filteredBody = filterObj(req.body, 'name', 'email');

  //3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: { user: updatedUser },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

