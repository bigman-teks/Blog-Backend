const User = require("../schema/userSchema")
const bcrypt = require("bcryptjs");



// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body;

    const updateData = { name };

    if (password) {
      
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers
}