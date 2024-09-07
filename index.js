const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Adjust the path to your routes file
const client = require('./config/db');  // Import your PostgreSQL client

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Use user routes
app.use('/api/users', userRoutes);

// Example function to run a query
async function runQuery() {
    try {
      // Test the database connection and log the entire result
      const res = await client.query('SELECT NOW()');
      console.log('Query result:', res);  // Log the full result to inspect its structure
  
      if (res && res.rows && res.rows.length > 0) {
        console.log('Current time:', res.rows[0]);
      } else {
        console.log('No rows returned from the query.');
      }
  
      // Start the server after successfully connecting to the database
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
  
    } catch (err) {
      console.error('Database query error', err.stack);
    }
  }
  

// Run the query function
runQuery();
