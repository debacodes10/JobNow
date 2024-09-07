const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController'); // Adjust the path to your controller

// Create a new job
router.post('/jobs/create', jobController.createJob);

// Get jobs by company_name
router.get('/jobs/:company_name', jobController.getJobsByCompanyName);

// Get all jobs
router.get('/jobs', jobController.getAllJobs);

// Get jobs by employment_type
router.get('/jobs/:employment_type', jobController.getJobsByEmploymentType);

// Update job by id
router.put('/jobs/:id', jobController.updateJobById);

// Delete job by id
router.delete('/jobs/:id', jobController.deleteJobById);

module.exports = router;
