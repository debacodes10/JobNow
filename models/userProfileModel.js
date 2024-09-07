const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file
const User = require('./userModel'); // Assuming you have a user model

const UserProfile = sequelize.define('UserProfile', {
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
    allowNull: false, // Required as it's linked to a user
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false, // Resume file URL is mandatory
    validate: {
      isUrl: true, // Ensures the value is a valid URL
    }
  },
  linkedin_url: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
    validate: {
      isUrl: true, // Ensures the value is a valid URL if provided
    }
  },
  portfolio_url: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
    validate: {
      isUrl: true, // Ensures the value is a valid URL if provided
    }
  },
  skills: {
    type: DataTypes.STRING, // Comma-separated list of skills (optional)
    allowNull: true,
  },
  experience: {
    type: DataTypes.TEXT, // Text field for applicant's experience (optional)
    allowNull: true,
  },
  education: {
    type: DataTypes.TEXT, // Text field for applicant's education details (optional)
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set when the profile is created
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set when the profile is updated
    allowNull: false,
  },
}, {
  tableName: 'user_profiles', // Table name in the database
  timestamps: false, // Manually managing created_at and updated_at fields
});

// Hook to update `updated_at` before saving
UserProfile.addHook('beforeUpdate', (userProfile) => {
  userProfile.updated_at = new Date();
});

module.exports = UserProfile;
