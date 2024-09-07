const UserProfile = require('../models/userProfileModel'); // Adjust the path to your model

// Create a new user profile
exports.createUserProfile = async (req, res) => {
  try {
    const { user_id, resume, linkedin_url, portfolio_url, skills, experience, education } = req.body;

    const newUserProfile = await UserProfile.create({
      user_id,
      resume,
      linkedin_url,
      portfolio_url,
      skills,
      experience,
      education,
    });

    res.status(201).json(newUserProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
};

// Get user profile by user_id
exports.getUserProfileByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const userProfile = await UserProfile.findOne({ where: { user_id } });

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// Update user profile by user_id
exports.updateUserProfileByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { resume, linkedin_url, portfolio_url, skills, experience, education } = req.body;

    const [updated] = await UserProfile.update(
      { resume, linkedin_url, portfolio_url, skills, experience, education },
      { where: { user_id } }
    );

    if (updated) {
      const updatedUserProfile = await UserProfile.findOne({ where: { user_id } });
      res.status(200).json(updatedUserProfile);
    } else {
      res.status(404).json({ error: 'User profile not found' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};

// Delete user profile by user_id
exports.deleteUserProfileByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const deleted = await UserProfile.destroy({ where: { user_id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User profile not found' });
    }
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ error: 'Failed to delete user profile' });
  }
};
