const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController'); // Adjust the path to your controller

// Create a new notification
router.post('/notification', notificationController.createNotification);

// Get notifications by user_id
router.get('/notification/:user_id', notificationController.getNotificationsByUserId);

// Update notifications by user_id (Optional, consider using notification ID for better specificity)
router.put('/notification/:user_id', notificationController.updateNotificationsByUserId);

// Delete notifications by user_id
router.delete('/notification/:user_id', notificationController.deleteNotificationsByUserId);

module.exports = router;
