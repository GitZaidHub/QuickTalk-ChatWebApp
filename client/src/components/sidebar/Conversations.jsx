import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import { Loader2, UserPlus } from "lucide-react";

const Conversations = () => {
  const { loading, conversation } = useGetConversation()

  return (
    <div className='flex flex-col p-2 space-y-1 h-full'>
      {conversation.map((conv, idx) => (
        <Conversation
          key={conv._id}
          conv={conv}
          lastIdx={idx === conversation.length - 1}
        />
      ))}

      {loading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>
      )}

      {!loading && conversation.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 mt-10 opacity-70">
          <div className="bg-indigo-50 p-4 rounded-full mb-3">
            <UserPlus className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-slate-900 font-semibold mb-1">No chats yet</h3>
          <p className="text-slate-500 text-sm">
            Search for users to start a conversation.
          </p>
        </div>
      )}
    </div>
  );
};

export default Conversations;
