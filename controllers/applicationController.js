const Application = require('../models/applicationModel'); // Adjust the path to your model

// Create a new application
exports.createApplication = async (req, res) => {
  try {
    const { job_id, applicant_id, cover_letter, resume, status } = req.body;

    // Create a new application entry
    const newApplication = await Application.create({
      job_id,
      applicant_id,
      cover_letter,
      resume,
      status,
    });

    res.status(201).json(newApplication);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
};

// Get application by application_id
exports.getApplicationById = async (req, res) => {
  try {
    const { application_id } = req.params;

    // Retrieve application by its ID
    const application = await Application.findOne({ where: { id: application_id } });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    console.error('Error fetching application by ID:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
};

// Update application by application_id
exports.updateApplicationById = async (req, res) => {
  try {
    const { application_id } = req.params;
    const { job_id, applicant_id, cover_letter, resume, status } = req.body;

    // Update the application details
    const [updated] = await Application.update(
      { job_id, applicant_id, cover_letter, resume, status },
      { where: { id: application_id } }
    );

    if (updated) {
      const updatedApplication = await Application.findOne({ where: { id: application_id } });
      res.status(200).json(updatedApplication);
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
};

// Delete application by application_id
exports.deleteApplicationById = async (req, res) => {
  try {
    const { application_id } = req.params;

    // Delete the application entry
    const deleted = await Application.destroy({ where: { id: application_id } });

    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: 'Application not found' });
    }
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};
