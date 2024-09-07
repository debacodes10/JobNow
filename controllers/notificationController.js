const Notification = require('../models/notificationModel'); // Adjust the path to your model

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { user_id, message, read } = req.body;

    const newNotification = await Notification.create({
      user_id,
      message,
      read,
    });

    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
};

// Get notifications by user_id
exports.getNotificationsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const notifications = await Notification.findAll({ where: { user_id } });

    if (!notifications.length) {
      return res.status(404).json({ error: 'No notifications found for this user ID' });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Update notifications by user_id (optional, based on requirements)
exports.updateNotificationsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { message, read } = req.body;

    // Note: Updating notifications by user_id may affect multiple records.
    // Consider using a unique identifier for updates, such as notification ID.
    const [updated] = await Notification.update(
      { message, read },
      { where: { user_id } }
    );

    if (updated) {
      const updatedNotifications = await Notification.findAll({ where: { user_id } });
      res.status(200).json(updatedNotifications);
    } else {
      res.status(404).json({ error: 'Notifications not found' });
    }
  } catch (error) {
    console.error('Error updating notifications:', error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
};

// Delete notifications by user_id
exports.deleteNotificationsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const deleted = await Notification.destroy({ where: { user_id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Notifications not found' });
    }
  } catch (error) {
    console.error('Error deleting notifications:', error);
    res.status(500).json({ error: 'Failed to delete notifications' });
  }
};
