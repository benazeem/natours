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

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.postUser = (req, res) => {
  console.log(req.body);
  if (req.body.name && req.body.email) {
    const newId = (users.length - 1) * 1 + 1;
    const newUser = Object.assign({ id: newId }, req.body);
    users.push(newUser);

    fs.writeFile(
      `${__dirname}/../dev-data/data/users.json`,
      JSON.stringify(users),
      (err) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: 'Could not save the User',
          });
        }
        res.status(201).json({
          status: 'success',
          data: {
            user: newUser,
          },
        });
      },
    );
  }
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const reqTour = users.find((el) => el._id === id);

  if (!reqTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }

  res.status(200).json(reqTour);
};

exports.deleteUser = factory.deleteDoc(User);

// exports.deleteUser = (req, res) => {
//   const id = req.params.id * 1;
//   const newusers = users.filter((el) => {
//     if (el._id === id) {
//       return null;
//     } else return el;
//   });

//   if (id > users.length) {
//     //Comment this
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Unable to Find User',
//     });
//   }

//   fs.writeFile(
//     `${__dirname}/dev-data/data/users.json`,
//     JSON.stringify(newusers),
//     (err) => {
//       if (err) {
//         res.status(500).json({
//           status: 'fail',
//           message: 'Unable to delete User',
//         });
//       }
//     },
//   );
//   res.status(204).send(null);
// };

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Create error if user try to post password
  // console.log(req);
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

exports.updateUser = (req, res) => {
  console.log(req.body);
};
