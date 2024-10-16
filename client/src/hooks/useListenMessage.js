import {React,useEffect} from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConverSation from '../zustand/useConversation';
import livechat from "../assets/sounds/livechat.mp3"
const useListenMessage = () => {
 const {socket}=useSocketContext();
 const {messages,setMessages} = useConverSation();

 useEffect(() => {
   socket?.on("newMessage",(newMessage)=>{
    newMessage.shouldShake = true;
    const sound = new Audio(livechat)
    sound.play();
    setMessages([...messages,newMessage])
   })

   return ()=>socket?.off("newMessage")
 }, [socket,setMessages,messages])
 

}

export default useListenMessage
