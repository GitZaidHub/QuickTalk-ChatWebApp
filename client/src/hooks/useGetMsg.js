import { React, useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import useConverSation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const useGetMsg = () => {
  const [loading, setLoading] = useState(false);
  const { author } = useAuthContext();
  const token = author?.token;
  const { messages, setMessages, selectedConversation } = useConverSation();

  useEffect(() => {
    const getMsg = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/message/${selectedConversation?._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response)
        const msg = response.data;
        console.log("getMsg ", msg);
        if (msg.error) throw new Error(msg.error);
        // Ensure messages support both text and image fields
        const formattedMessages = msg.map((message) => ({
          text: message.message || "", // Text message
          imageUrl: message.image || "", // Image URL
          ...message, // Include other possible fields like timestamp, sender info
        }));

        setMessages(formattedMessages);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMsg();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};

export default useGetMsg;
