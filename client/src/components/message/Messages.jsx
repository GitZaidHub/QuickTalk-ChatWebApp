import React, { useRef,useEffect } from "react";
import useGetMsg from "../../hooks/useGetMsg";
import Skeleton from "../skeletions/Skeleton";
import Message from "../message/Message"
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const {messages,loading}=useGetMsg()
  useListenMessage()
  const lastMessageRef = useRef()
  
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth" })
    }, 100);
  }, [messages])
  

  return (
    <div className="overflow-auto h-[73vh] custom-scrollbar">
      {loading && [...Array(6)].map((_,idx)=> <Skeleton key={idx} />)}

      {!loading &&messages.length > 0 && messages.map((msg)=>(
        <div key={msg._id} ref={lastMessageRef}><Message key={msg._id} msg={msg} /></div>
      )) }

      {!loading && messages.length ===0 && (
        <p className="text-center">send a Message to start conversation</p>
      ) }
    </div>
  );
};

export default Messages;
