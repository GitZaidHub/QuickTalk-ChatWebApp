import {React,useState,useEffect} from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConverSation from "../../zustand/useConversation";
import axios from "axios";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

// Add locales
TimeAgo.addDefaultLocale(en) // Add English as the default locale
TimeAgo.addLocale(ru) // Add Russian as an additional locale

const Message = ({ msg }) => {

  const {author} = useAuthContext()
  const { selectedConversation } = useConverSation();
  const [currentUser, setCurrentUser] = useState([])
  const isUser = msg.senderId === author?.id;
  const profilePic = isUser ? currentUser.profilePic : selectedConversation.profilePic;
  const shakeClass = msg.shouldShake ? "shake" :"";

  useEffect(() => {
    const getAuthor = async()=>{
      try {
        const response = await axios.get(`/api/users/${author.id}`)
        setCurrentUser(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
    if(author?.id){
      getAuthor();
    }
    
  }, [author?.id])
 

  return (
    <div
      className={`p-3 ${isUser ? "flex justify-end" : "flex justify-start"}`}
    >
      <div
        className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
      >
        {/* Avatar */}
        <img
          className="w-8 h-8 rounded-full"
          src={profilePic}
          alt={msg.name}
        />

        {/* Message Container */}
        <div
          className={`flex flex-col gap-1 ${shakeClass} ${
            isUser ? "items-end" : "items-start"
          } w-full max-w-[320px]`}
        >
          {/* Name and Time */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-500">
              {isUser ? author.username : selectedConversation.username}
            </span>
            <span className="text-sm font-extralight text-gray-500">
            <ReactTimeAgo date={new Date(msg.createdAt)} locale="en-US" />
            </span>
          </div>

          {/* Message Bubble */}
              {/* Message Bubble */}
              {msg.message ? (
            // Render text message
            <div
              className={`flex flex-col px-4 py-3 border bg-gray-600 text-white rounded-xl 
              ${isUser ? "rounded-s-xl" : "rounded-e-xl"}`}
            >
              <p className="text-sm font-normal text-white">{msg.message}</p>
            </div>
          ) : msg.image ? (
            // Render image if available
            <div
              className={`flex flex-col px-2 py-1 border bg-gray-600 text-white rounded-xl 
              ${isUser ? "rounded-s-xl" : "rounded-e-xl"}`}
            >
              <img
                src={msg.image}
                alt="uploaded content"
                className="rounded-lg max-w-xs max-h-64 object-cover"
              />
            </div>
          ) : null}


          {/* Message Status */}
          {isUser && (
            <span className="text-sm font-extralight text-gray-500">
              Delivered
            </span>
          )}
        </div>

        {/* Options Dropdown (Optional) */}
      </div>
    </div>
  );
};

export default Message;
