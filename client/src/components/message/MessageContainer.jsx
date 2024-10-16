import {React,useEffect} from 'react'
import Header from './Header'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useConverSation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { RiChatSmile3Line } from "react-icons/ri";

const MessageContainer = () => {
  const {author} = useAuthContext();
  const {selectedConversation , setSelectedConversation} = useConverSation();
  useEffect(() => {
    // cleanup
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])
  

  return (
    <div className='flex flex-col w-3/4'>
      {!selectedConversation ? <div className='flex items-center flex-col justify-center bg-gray-400 w-full h-full'>
        <div className=' flex flex-row'>

        <h1 className='text-white mb-12 py-4 text-2xl  font-bold'>Welcome to <span className='text-blue-900'>QuickTalk</span><span className='flex items-center text-3xl justify-center'><RiChatSmile3Line/></span> </h1>
        </div>
        <div className='px-4 text-center sm:text-lg md:text-xl  text-white font-semibold flex flex-col items-center gap-2'>
          <span>Hi 👋 {author?.username} </span>
          <span>Click any chat to start conversation</span>
        </div>
      </div> : <>
      <Header />
      <Messages/>
      <MessageInput/>
      </>
}
    </div>
  )
}

export default MessageContainer
