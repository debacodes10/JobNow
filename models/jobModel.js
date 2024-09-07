const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file
const User = require('./userModel'); // Assuming you have a user model to reference

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  company_website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true, // Ensures the value is a valid URL
    },
    allowNull: true, // Optional field
  },
  location: {
    type: DataTypes.STRING(100), // You can specify the city or 'remote'
    allowNull: false,
  },
  employment_type: {
    type: DataTypes.ENUM('full-time', 'part-time', 'internship', 'contract'),
    allowNull: false,
  },
  salary_range: {
    type: DataTypes.STRING(50), // Format can be a string like "50k-60k" or "Negotiable"
    allowNull: true, // Optional field
  },
  experience_level: {
    type: DataTypes.ENUM('entry', 'mid', 'senior', 'internship'),
    allowNull: false,
  },
  posted_by: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // References the User model
      key: 'id',   // User's primary key
    },
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'jobs', // Table name in the database
  timestamps: false, // We are managing created_at and updated_at manually
});

// Hook to update `updated_at` before saving
Job.addHook('beforeUpdate', (job) => {
  job.updated_at = new Date();
});

module.exports = Job;
