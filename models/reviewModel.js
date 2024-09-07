const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file
const User = require('./userModel'); // Assuming you have a User model
const Company = require('./companyModel'); // Assuming you have a Company model

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // References the User model (applicant)
      key: 'id',   // User's primary key
    },
    allowNull: false, // Review must be linked to a user (applicant)
  },
  company_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Company, // References the Company model
      key: 'id',      // Company's primary key
    },
    allowNull: false, // Review must be linked to a company
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false, // Rating is required
    validate: {
      min: 1,         // Minimum rating of 1
      max: 5,         // Maximum rating of 5
    }
  },
  review: {
    type: DataTypes.TEXT, // Review content written by the user
    allowNull: true,      // Optional, the user may leave just a rating
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set when the review is created
    allowNull: false,
  }
}, {
  tableName: 'reviews', // Table name in the database
  timestamps: false,    // Managing created_at manually
});

module.exports = Review;
