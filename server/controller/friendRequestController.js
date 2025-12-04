import FriendRequest from "../model/friendRequestModel.js";
import User from "../model/userModel.js";

export const sendFriendRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user.id;

        if (senderId === receiverId) {
            return res.status(400).json({ error: "You cannot send a friend request to yourself" });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });

        if (existingRequest) {
            if (existingRequest.status === 'accepted') {
                return res.status(400).json({ error: "You are already friends" });
            }
            if (existingRequest.status === 'pending') {
                return res.status(400).json({ error: "Friend request already pending" });
            }
        }

        const newRequest = new FriendRequest({
            sender: senderId,
            receiver: receiverId
        });

        await newRequest.save();
        res.status(201).json({ message: "Friend request sent successfully", request: newRequest });

    } catch (error) {
        console.log("Error in sendFriendRequest controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPendingRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const requests = await FriendRequest.find({ receiver: userId, status: "pending" })
            .populate("sender", "username fullName profilePic");

        res.status(200).json(requests);
    } catch (error) {
        console.log("Error in getPendingRequests controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const userId = req.user.id;

        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ error: "Friend request not found" });
        }

        if (request.receiver.toString() !== userId) {
            return res.status(403).json({ error: "You are not authorized to accept this request" });
        }

        if (request.status !== "pending") {
            return res.status(400).json({ error: "Request is already " + request.status });
        }

        request.status = "accepted";
        await request.save();

        res.status(200).json({ message: "Friend request accepted", request });

    } catch (error) {
        console.log("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const rejectFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const userId = req.user.id;

        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ error: "Friend request not found" });
        }

        if (request.receiver.toString() !== userId) {
            return res.status(403).json({ error: "You are not authorized to reject this request" });
        }

        if (request.status !== "pending") {
            return res.status(400).json({ error: "Request is already " + request.status });
        }

        request.status = "rejected";
        await request.save();

        res.status(200).json({ message: "Friend request rejected", request });

    } catch (error) {
        console.log("Error in rejectFriendRequest controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
