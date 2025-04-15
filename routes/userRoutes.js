const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();
const { signup } = authController;
const { getAllUsers, createNewUser, getUserById, updateUser, deleteUser } =
  userController;
router.route('/signup').post(signup);
router.route('/').get(getAllUsers).post(createNewUser);
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
