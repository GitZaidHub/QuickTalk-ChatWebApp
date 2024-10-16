import {React,useState} from "react";
import useConverSation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSendMsg = () => {
  const [loading, setLoading] = useState(false);
  const { author } = useAuthContext();
  const token = author?.token;
  const { messages, setMessages, selectedConversation } = useConverSation();

  const sendMsg = async (messageData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation?._id}`,
        { message: messageData.message, imageUrl: messageData.imageUrl }, // Ensure to send both message and image URL
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("here is response :",res)
      const msg = res.data;
      if (msg.error) throw new Error(msg.error);
      setMessages([...messages, msg]);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMsg, loading };
};


export default useSendMsg;
