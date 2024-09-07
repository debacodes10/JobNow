const User = require('../models/userModel'); // Adjust the path to your model

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password_hash, first_name, last_name, phone_number, profile_picture, role } = req.body;

    const newUser = await User.create({
      username,
      email,
      password_hash,
      first_name,
      last_name,
      phone_number,
      profile_picture,
      role,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Read user data by email (GET by email)
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Get all users with a specific role (NEW controller method)
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    const users = await User.findAll({ where: { role } });

    if (!users || users.length === 0) {
      return res.status(404).json({ error: `No users found with the role: ${role}` });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by role:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Update user data by email
exports.updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { username, password_hash, first_name, last_name, phone_number, profile_picture, role } = req.body;

    const [updated] = await User.update(
      { username, password_hash, first_name, last_name, phone_number, profile_picture, role },
      { where: { email } }
    );

    if (updated) {
      const updatedUser = await User.findOne({ where: { email } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user data by email
exports.deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const deleted = await User.destroy({ where: { email } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
