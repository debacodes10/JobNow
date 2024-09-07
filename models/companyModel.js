const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration file

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, // Ensures each company has a unique name
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field
    validate: {
      isUrl: true, // Ensures the value is a valid URL if provided
    }
  },
  industry: {
    type: DataTypes.STRING(100), // Industry type, optional
    allowNull: true,
  },
  size: {
    type: DataTypes.INTEGER, // Company size (e.g., number of employees), optional
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING(100), // City, region, or country
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set when the record is created
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set when the record is updated
    allowNull: false,
  },
}, {
  tableName: 'companies', // Table name in the database
  timestamps: false, // We manage timestamps manually with created_at and updated_at
});

// Hook to update `updated_at` before saving
Company.addHook('beforeUpdate', (company) => {
  company.updated_at = new Date();
});

module.exports = Company;
