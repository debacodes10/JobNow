const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file
const User = require('./userModel'); // Assuming you have a user model
const Job = require('./jobModel'); // Assuming you have a job model

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  job_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Job, // References the Job model
      key: 'id',  // Job's primary key
    },
    allowNull: false,
  },
  applicant_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // References the User model (applicant)
      key: 'id',   // User's primary key
    },
    allowNull: false,
  },
  cover_letter: {
    type: DataTypes.TEXT, // Optional cover letter
    allowNull: true,
  },
  resume: {
    type: DataTypes.STRING, // URL link to the resume
    allowNull: false,
    validate: {
      isUrl: true, // Ensures the value is a valid URL
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'interview', 'offered', 'rejected'),
    defaultValue: 'pending', // Default status when an application is created
    allowNull: false,
  },
  submitted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set the timestamp when the application is submitted
    allowNull: false,
  },
}, {
  tableName: 'applications', // Table name in the database
  timestamps: false, // Manually handling the submitted_at timestamp
});

module.exports = Application;
