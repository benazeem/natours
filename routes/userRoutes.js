const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.postUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;