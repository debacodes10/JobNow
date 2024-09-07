// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.createUser);

// Get user by email
router.get('/users/:email', userController.getUserByEmail);

// Get user by role
router.get('/users/:role', userController.getUsersByRole);

// Update user by email
router.put('/users/:email', userController.updateUserByEmail);


// Delete user by email
router.delete('/users/:email', userController.deleteUserByEmail);

module.exports = router;
