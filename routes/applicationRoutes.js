const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController'); // Adjust the path to your controller

// Route to create a new application
router.post('/applications', applicationController.createApplication);

// Route to get application by application_id
router.get('/applications/:application_id', applicationController.getApplicationById);

// Route to update application by application_id
router.put('/applications/:application_id', applicationController.updateApplicationById);

// Route to delete application by application_id
router.delete('/applications/:application_id', applicationController.deleteApplicationById);

module.exports = router;
