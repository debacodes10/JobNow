const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file
const User = require('./userModel'); // Assuming you have a User model

const Admin = sequelize.define('Admin', {
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
    allowNull: false, // Admin must be linked to a user
  },
  role: {
    type: DataTypes.ENUM('superadmin', 'moderator', 'content_manager'),
    allowNull: false, // Role is required
  },
  permissions: {
    type: DataTypes.TEXT, // Optional field to store custom permissions or roles
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set when the admin role is created
    allowNull: false,
  }
}, {
  tableName: 'admins', // Table name in the database
  timestamps: false, // Manually managing created_at
});

module.exports = Admin;
