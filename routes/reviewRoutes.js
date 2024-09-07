const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); // Adjust the path to your controller

// Create a new review
router.post('/reviews', reviewController.createReview);

// Get reviews by company_id
router.get('/reviews/:company_id', reviewController.getReviewsByCompanyId);

// Update reviews by company_id (Optional, consider using review ID for better specificity)
router.put('/reviews/:company_id', reviewController.updateReviewByCompanyId);

// Delete reviews by company_id
router.delete('/reviews/:company_id', reviewController.deleteReviewsByCompanyId);

module.exports = router;
