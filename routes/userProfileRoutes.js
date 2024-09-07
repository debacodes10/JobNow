const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController'); // Adjust the path to your controller

// Create a new user profile
router.post('/user-profile', userProfileController.createUserProfile);

// Get user profile by user_id
router.get('/user-profile/:user_id', userProfileController.getUserProfileByUserId);

// Update user profile by user_id
router.put('/user-profile/:user_id', userProfileController.updateUserProfileByUserId);

// Delete user profile by user_id
router.delete('/user-profile/:user_id', userProfileController.deleteUserProfileByUserId);

module.exports = router;
