const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

const { getAllUsers, createNewUser, getUserById, updateUser, deleteUser } =
  userController;

router.route('/').get(getAllUsers).post(createNewUser);
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
