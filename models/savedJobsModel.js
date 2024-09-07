const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file
const User = require('./userModel'); // Assuming you have a User model
const Job = require('./jobModel'); // Assuming you have a Job model

const SavedJob = sequelize.define('SavedJob', {
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
    allowNull: false, // This field is required as it links to the applicant
  },
  job_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Job,  // References the Job model
      key: 'id',   // Job's primary key
    },
    allowNull: false, // This field is required as it links to the job
  },
  saved_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically sets the timestamp when a job is saved
    allowNull: false,
  }
}, {
  tableName: 'saved_jobs', // Table name in the database
  timestamps: false, // Manually managing the saved_at field
});

module.exports = SavedJob;
