const express = require('express');
const router = express.Router();
const savedJobController = require('../controllers/savedJobsController'); // Adjust the path to your controller

// Create a new saved job
router.post('/saved-jobs', savedJobController.createSavedJob);

// Get saved jobs by job_id
router.get('/saved-jobs/:job_id', savedJobController.getSavedJobsByJobId);

// Update saved job by job_id (if required)
router.put('/saved-jobs/:job_id', savedJobController.updateSavedJobByJobId);

// Delete saved job by job_id
router.delete('/saved-jobs/:job_id', savedJobController.deleteSavedJobByJobId);

module.exports = router;
