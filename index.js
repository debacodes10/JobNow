const express = require('express');
const bodyParser = require('body-parser');
const client = require('./config/db');  // Import your PostgreSQL client

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const savedJobsRoutes = require('./routes/savedJobsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const jobRoutes = require('./routes/jobRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const companyRoutes = require('./routes/companyRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

app.use('/api', userRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', savedJobsRoutes);
app.use('/api', reviewRoutes);
app.use('/api', notificationRoutes);
app.use('/api', jobRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', companyRoutes);
app.use('/api', applicationRoutes);

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
