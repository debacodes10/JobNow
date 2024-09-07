const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController'); // Adjust the path to your controller

// Route to create a new feedback entry
router.post('/feedback', feedbackController.createFeedback);

// Route to get feedback by application_id
router.get('/feedback/:application_id', feedbackController.getFeedbackByApplicationId);

// Route to update feedback by application_id
router.put('/feedback/:application_id', feedbackController.updateFeedbackByApplicationId);

// Route to delete feedback by application_id
router.delete('/feedback/:application_id', feedbackController.deleteFeedbackByApplicationId);

module.exports = router;
