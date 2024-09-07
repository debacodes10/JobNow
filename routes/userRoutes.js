// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Get user by email
router.get('/:email', userController.getUserByEmail);

// Get user by role
router.get('/:role', userController.getUsersByRole);

// Update user by email
router.put('/:email', userController.updateUserByEmail);


// Delete user by email
router.delete('/:email', userController.deleteUserByEmail);

module.exports = router;
