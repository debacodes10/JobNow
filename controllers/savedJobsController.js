const SavedJob = require('../models/savedJobsModel'); // Adjust the path to your model

// Create a new saved job
exports.createSavedJob = async (req, res) => {
  try {
    const { user_id, job_id } = req.body;

    const newSavedJob = await SavedJob.create({
      user_id,
      job_id,
    });

    res.status(201).json(newSavedJob);
  } catch (error) {
    console.error('Error creating saved job:', error);
    res.status(500).json({ error: 'Failed to create saved job' });
  }
};

// Get saved jobs by job_id
exports.getSavedJobsByJobId = async (req, res) => {
  try {
    const { job_id } = req.params;

    const savedJobs = await SavedJob.findAll({ where: { job_id } });

    if (!savedJobs.length) {
      return res.status(404).json({ error: 'No saved jobs found for this job ID' });
    }

    res.status(200).json(savedJobs);
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ error: 'Failed to fetch saved jobs' });
  }
};

// Update saved job by job_id (Optional based on requirements)
exports.updateSavedJobByJobId = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { user_id } = req.body; // Assuming you want to update the user_id

    const [updated] = await SavedJob.update(
      { user_id },
      { where: { job_id } }
    );

    if (updated) {
      const updatedSavedJob = await SavedJob.findOne({ where: { job_id } });
      res.status(200).json(updatedSavedJob);
    } else {
      res.status(404).json({ error: 'Saved job not found' });
    }
  } catch (error) {
    console.error('Error updating saved job:', error);
    res.status(500).json({ error: 'Failed to update saved job' });
  }
};

// Delete saved job by job_id
exports.deleteSavedJobByJobId = async (req, res) => {
  try {
    const { job_id } = req.params;

    const deleted = await SavedJob.destroy({ where: { job_id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Saved job not found' });
    }
  } catch (error) {
    console.error('Error deleting saved job:', error);
    res.status(500).json({ error: 'Failed to delete saved job' });
  }
};
