// config/db.js
const { Sequelize } = require('sequelize');

// Initialize Sequelize with your PostgreSQL connection details
const sequelize = new Sequelize('test', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres', // Sequelize will use PostgreSQL
  port: 5432, // PostgreSQL port (default is 5432)
});

// Test the connection to the PostgreSQL database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Export the sequelize instance for use in models
module.exports = sequelize;
