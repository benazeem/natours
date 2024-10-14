const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    total: users.length,
    data: users,
  });
};

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
      }
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

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;

  const newusers = users.filter((el) => {
    if (el._id === id) {
      return null;
    } else return el;
  });

  if (id > users.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Unable to Find User',
    });
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(newusers),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'fail',
          message: 'Unable to delete User',
        });
      }
    }
  );
  res.status(204).send(null);
};

exports.updateUser = (req, res) => {
  console.log(req.body);
};
