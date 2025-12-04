import { React, useEffect } from 'react'
import Header from './Header'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useConverSation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { MessageSquare } from "lucide-react";

const MessageContainer = () => {
  const { author } = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConverSation();

  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <div className='flex flex-col flex-1 h-full bg-white relative'>
      {!selectedConversation ? (
        <div className='flex items-center flex-col justify-center w-full h-full bg-slate-50/50'>
          <div className='flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-md'>
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center animate-bounce-slow">
              <MessageSquare size={40} className="text-indigo-600" />
            </div>
            <div className='space-y-2'>
              <h1 className='text-2xl font-bold text-slate-800'>
                Welcome, {author?.username}!
              </h1>
              <p className='text-slate-500'>
                Select a conversation from the sidebar to start chatting or find new friends to connect with.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer
