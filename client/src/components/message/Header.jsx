import React from 'react'
import useConverSation from '../../zustand/useConversation'
import { Video, Phone, MoreVertical } from "lucide-react";
import { Link } from 'react-router-dom';
import { useSocketContext } from '../../context/SocketContext';

const Header = () => {
  const { onlineUsers } = useSocketContext()
  const { selectedConversation } = useConverSation();
  const isOnline = onlineUsers.includes(selectedConversation._id)

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
            <img
              src={selectedConversation?.profilePic}
              alt="avatar"
              className="object-cover w-full h-full rounded-full border-2 border-white"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        <div className='flex flex-col'>
          <span className="font-bold text-slate-800 text-sm">{selectedConversation?.username}</span>
          <span className={`text-xs ${isOnline ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}>
            {isOnline ? 'Active now' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to={'/construction'}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
        >
          <Phone size={20} />
        </Link>
        <Link
          to={'/construction'}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
        >
          <Video size={20} />
        </Link>
        <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  )
}

export default Header
