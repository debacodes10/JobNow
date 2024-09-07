const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file
const User = require('./userModel'); // Assuming you have a User model

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // References the User model
      key: 'id',   // User's primary key
    },
    allowNull: false, // Notification must be linked to a user
  },
  message: {
    type: DataTypes.TEXT, // The content of the notification
    allowNull: false, // Message is required
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default to unread when created
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set when the notification is created
    allowNull: false,
  }
}, {
  tableName: 'notifications', // Table name in the database
  timestamps: false, // Managing created_at manually
});

module.exports = Notification;
