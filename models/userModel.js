// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  profile_picture: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('applicant', 'employer', 'admin'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: 'users',
  timestamps: false, // Manage timestamps manually
});

// Hook to update `updated_at` on save
User.addHook('beforeUpdate', (user) => {
  user.updated_at = new Date();
});

module.exports = User;
