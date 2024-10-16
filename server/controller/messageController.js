import Conversation from "../model/conversationmodel.js";
import Message from "../model/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

 export const sendMessages=async(req,res)=>{
    try {
        //procted route (authmiddleware)
        const {message,imageUrl} = req.body;
        console.log("image url :",imageUrl)
        const {id:receiverId} = req.params;
        const senderId = req.user.id;

        let conversation = await Conversation.findOne({
            participants:{$all: [senderId,receiverId]},
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message: message || "" ,
            image:imageUrl || "",
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }
       await  Promise.all([conversation.save(),newMessage.save()])

       //socket functionality
       const receiverSocketId = getReceiverSocketId(receiverId);
       if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
       }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userTochat} = req.params;
        const senderId = req.user.id

        const conversation =await  Conversation.findOne({
            participants:{$all: [senderId,userTochat]},
        }).populate("messages")

        if(!conversation) return res.status(200).json([])

            const messages = conversation.messages
        res.status(201).json(messages)
    } catch (error) {
        console.log('error in getMessages handle ',error.message)
        res.status(422).json({error:"Internal server error occured"})
    }
}
