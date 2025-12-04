import React, { useState } from 'react'
import Profile from './Profile'
import Conversations from './Conversations'
import Logout from '../../pages/Logout'
import SearchInput from './SearchInput'
import FriendRequests from './FriendRequests'
import useFriendRequest from '../../hooks/useFriendRequest'
import { MessageSquare, UserPlus } from 'lucide-react'

const Sidebar = () => {
  const [showRequests, setShowRequests] = useState(false);
  const { pendingRequests } = useFriendRequest();

  return (
    <div className='flex flex-col w-full md:w-1/3 lg:w-1/4 bg-slate-50 border-r border-slate-200 h-full'>
      {/* Header Section */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <Profile />
        <div className="mt-4">
          <SearchInput />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex p-2 gap-2 bg-slate-50">
        <button
          onClick={() => setShowRequests(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${!showRequests
              ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200'
              : 'text-slate-500 hover:bg-slate-200/50'
            }`}
        >
          <MessageSquare size={18} />
          Chats
        </button>
        <button
          onClick={() => setShowRequests(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all relative ${showRequests
              ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200'
              : 'text-slate-500 hover:bg-slate-200/50'
            }`}
        >
          <UserPlus size={18} />
          Requests
          {pendingRequests.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-white">
              {pendingRequests.length}
            </span>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {showRequests ? <FriendRequests /> : <Conversations />}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <Logout />
      </div>
    </div>
  )
}

export default Sidebar
