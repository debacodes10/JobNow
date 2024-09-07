const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file
const Application = require('./applicationModel'); // Assuming you have an Application model

const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  application_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Application, // References the Application model
      key: 'id',          // Application's primary key
    },
    allowNull: false, // Required to link feedback or interview to an application
  },
  interview_date: {
    type: DataTypes.DATE, // Optional field for scheduling the interview
    allowNull: true,      // Not every application might have an interview date
  },
  feedback: {
    type: DataTypes.TEXT, // Optional feedback text after an interview
    allowNull: true,      // Feedback might not always be provided
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set when the feedback or interview record is created
    allowNull: false,
  }
}, {
  tableName: 'feedbacks', // Table name in the database
  timestamps: false, // Managing created_at manually
});

module.exports = Feedback;
