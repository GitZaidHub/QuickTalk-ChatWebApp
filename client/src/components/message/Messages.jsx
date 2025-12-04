import React, { useRef, useEffect } from "react";
import useGetMsg from "../../hooks/useGetMsg";
import Skeleton from "../skeletions/Skeleton";
import Message from "../message/Message"
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMsg()
  useListenMessage()
  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100);
  }, [messages])


  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-slate-50">
      {loading && [...Array(6)].map((_, idx) => <Skeleton key={idx} />)}

      {!loading && messages.length > 0 && messages.map((msg) => (
        <div key={msg._id} ref={lastMessageRef}>
          <Message key={msg._id} msg={msg} />
        </div>
      ))}

      {!loading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <p className="text-sm">No messages yet.</p>
          <p className="text-xs">Send a message to start the conversation.</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
