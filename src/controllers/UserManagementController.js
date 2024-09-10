const User = require('../models/UserManagement.js'); // Make sure the path to your User model is correct

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { userName, emailAddress, password, role, privileges } = req.body;
    
    // Create a new user instance
    const user = new User({
      userName,
      emailAddress,
      password,
      role,
      privileges
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName, emailAddress, password, role, privileges } = req.body;

    // Find the user by ID and update with the provided data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userName, emailAddress, password, role, privileges },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete an existing user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error: error.message });
  }
};
