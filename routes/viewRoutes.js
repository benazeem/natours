const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getMe)

router.use(authController.isLoggedIn);
router.get('/', viewsController.getOverview);
router.get('/tours/:slug', viewsController.getTour);
router.get('/login', viewsController.getLogin);

module.exports = router;
