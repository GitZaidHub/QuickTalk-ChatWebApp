import React from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import useConverSation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({conv,lastIdx}) => {

  const {selectedConversation , setSelectedConversation} = useConverSation()
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conv._id)
  const isSelected = selectedConversation?._id===conv._id;

  return (
    <>
   <div className={`flex justify-between items-center md:p-3 p-1 ${lastIdx ? "":`border-b`} border-gray-300 hover:bg-gray-300 cursor-pointer
    ${isSelected ? `bg-gray-300` : `"`}
    `}
    onClick={()=>setSelectedConversation(conv)}
    >
  <div className="flex items-center gap-3">
  <div className="relative">
    <img className="md:w-10 w-6 md:h-10 h-7 rounded-full" src={conv.profilePic} alt=""/>
    {isOnline && ( <span className={`top-0 left-7 absolute  w-3.5 h-3.5 bg-blue-500 border-2 border-white dark:border-gray-800 rounded-full`}></span>)}
</div>
    <span className="font-semibold text-sm md:text-base text-gray-800">{conv.username}</span>
  </div>
  <div className="md:text-xl hidden md:block text-gray-500 hover:text-gray-700 cursor-pointer">
    <IoChatbubbleOutline />
  </div>
</div>
    </>

  );
};

export default Conversation;
