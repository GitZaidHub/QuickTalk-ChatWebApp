import React from 'react'
import useConverSation from '../../zustand/useConversation'
import { IoVideocam } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSocketContext } from '../../context/SocketContext';

const Header = () => {
  const {onlineUsers} = useSocketContext()
  const {selectedConversation , setSelectedConversation} = useConverSation();
  const isOnline = onlineUsers.includes(selectedConversation._id)

  return (
    <div className="flex justify-between items-center p-2.5 border-b border-gray-300 ">
      <div className="flex items-center gap-3">
        <div className="rounded-full w-11 h-11 border border-gray-300 overflow-hidden">
          <img
            src={selectedConversation?.profilePic}
            alt="avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <div className='flex flex-col '>

        <span className="font-semibold text-gray-800">{selectedConversation?.username}</span>
       {isOnline && ( <span className='text-blue-700'>Online</span>)}
        </div>
      </div>
      <div className="text-xl flex items-center flex-row-reverse  gap-5 w-1/6 text-gray-500 ">
        <div className='rounded-md bg-slate-300 text-black p-1 cursor-pointer hover:text-normal hover:bg-slate-400'>

        <Link to={'/construction'}> <IoVideocam /></Link> 
        </div>
        <div className='rounded-md bg-slate-300 text-black p-1 cursor-pointer hover:text-normal hover:bg-slate-400'>

         <Link to={'/construction'}><IoMdCall/></Link> 
        </div>
      </div>
      
    </div>
  )
}

export default Header
