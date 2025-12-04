import React from "react";
import useConverSation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conv, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConverSation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conv._id);
  const isSelected = selectedConversation?._id === conv._id;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group
        ${isSelected ? "bg-indigo-50" : "hover:bg-slate-50"}
      `}
      onClick={() => setSelectedConversation(conv)}
    >
      <div className="relative shrink-0">
        <div className={`w-12 h-12 rounded-full p-[2px] ${isSelected ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-slate-200'} transition-colors`}>
          <img
            className="w-full h-full rounded-full object-cover border-2 border-white"
            src={conv.profilePic}
            alt={conv.username}
          />
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <span className={`font-semibold text-sm truncate ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
            {conv.username}
          </span>
          {/* Optional: Add time or unread badge here */}
        </div>
        <p className={`text-xs truncate ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
