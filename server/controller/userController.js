import User from "../model/userModel.js";

export const getUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password").sort({createdAt:-1});

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("error in getUser controller", error.message);
    res.status(422).json({ error: "Internal server Error" });
  }
};

export const changeProfilePic = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const userId = req.user.id; // Assuming the user ID is extracted from the token in `authenticateUser` middleware

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Find user and update their profile pic in the database
    const user = await User.findByIdAndUpdate(userId, { profilePic: imageUrl }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Profile picture updated successfully', user });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return res
      .status(500)
      .json({ message: "Unable to update profile picture" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({
      id: user._id,
      username: user.username,
      profilePic: user.profilePic, // Ensure this is returned
    });
  } catch (error) {
    console.log("error in userprofile");
    res.status(500).json({ error: "server error " });
  }
};
