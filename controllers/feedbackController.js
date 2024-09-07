const Feedback = require('../models/feedbackModel'); // Adjust the path to your model

// Create a new feedback entry
exports.createFeedback = async (req, res) => {
  try {
    const { application_id, interview_date, feedback } = req.body;

    const newFeedback = await Feedback.create({
      application_id,
      interview_date,
      feedback,
    });

    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
};

// Get feedback by application_id
exports.getFeedbackByApplicationId = async (req, res) => {
  try {
    const { application_id } = req.params;

    const feedback = await Feedback.findAll({ where: { application_id } });

    if (!feedback.length) {
      return res.status(404).json({ error: 'No feedback found for this application ID' });
    }

    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback by application ID:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

// Update feedback by application_id
exports.updateFeedbackByApplicationId = async (req, res) => {
  try {
    const { application_id } = req.params;
    const { interview_date, feedback } = req.body;

    const [updated] = await Feedback.update(
      { interview_date, feedback },
      { where: { application_id } }
    );

    if (updated) {
      const updatedFeedback = await Feedback.findAll({ where: { application_id } });
      res.status(200).json(updatedFeedback);
    } else {
      res.status(404).json({ error: 'Feedback not found for this application ID' });
    }
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

// Delete feedback by application_id
exports.deleteFeedbackByApplicationId = async (req, res) => {
  try {
    const { application_id } = req.params;

    const deleted = await Feedback.destroy({ where: { application_id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Feedback not found for this application ID' });
    }
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};
