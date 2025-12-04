import User from "../model/userModel.js";
import FriendRequest from "../model/friendRequestModel.js";
import Conversation from "../model/conversationmodel.js";

export const getUser = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    // Find all accepted friend requests where the current user is either sender or receiver
    const friendships = await FriendRequest.find({
      $or: [
        { sender: loggedInUserId, status: 'accepted' },
        { receiver: loggedInUserId, status: 'accepted' }
      ]
    });

    // Extract the IDs of the friends
    const friendIds = friendships.map(friendship =>
      friendship.sender.toString() === loggedInUserId ? friendship.receiver : friendship.sender
    );

    // Fetch friend details
    const friends = await User.find({
      _id: { $in: friendIds },
    }).select("-password");

    // Fetch all conversations involving the logged-in user
    const conversations = await Conversation.find({
      participants: loggedInUserId
    });

    // Create a map of friendId -> lastChatTime
    const lastChatMap = new Map();
    conversations.forEach(conv => {
      // Find the other participant
      const otherParticipantId = conv.participants.find(id => id.toString() !== loggedInUserId);
      if (otherParticipantId) {
        lastChatMap.set(otherParticipantId.toString(), new Date(conv.updatedAt));
      }
    });

    // Sort friends based on lastChatTime (descending)
    // If no conversation exists, use a very old date (0)
    const sortedFriends = friends.sort((a, b) => {
      const timeA = lastChatMap.get(a._id.toString()) || new Date(0);
      const timeB = lastChatMap.get(b._id.toString()) || new Date(0);
      return timeB - timeA;
    });

    res.status(200).json(sortedFriends);
  } catch (error) {
    console.log("error in getUser controller", error.message);
    res.status(422).json({ error: "Internal server Error" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const loggedInUserId = req.user.id;

    if (!query) return res.status(400).json({ error: "Query is required" });

    const users = await User.find({
      username: { $regex: query, $options: "i" },
      _id: { $ne: loggedInUserId }
    }).select("-password");

    // Check friendship status for each user
    const usersWithStatus = await Promise.all(users.map(async (user) => {
      const request = await FriendRequest.findOne({
        $or: [
          { sender: loggedInUserId, receiver: user._id },
          { sender: user._id, receiver: loggedInUserId }
        ]
      });

      let status = 'none';
      if (request) {
        status = request.status;
        if (status === 'pending' && request.receiver.toString() === loggedInUserId) {
          status = 'incoming_pending'; // Distinguish incoming requests
        }
      }

      return { ...user.toObject(), friendshipStatus: status };
    }));

    res.status(200).json(usersWithStatus);
  } catch (error) {
    console.log("Error in searchUsers controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
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
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("error in userprofile");
    res.status(500).json({ error: "server error " });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(userId, { bio }, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUserProfile", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
