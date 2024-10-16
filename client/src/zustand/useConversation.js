import { create } from "zustand";

const useConverSation = create((set)=>({
    selectedConversation:null,
    setSelectedConversation : (selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages: (messages)=> set({messages}),
}))

export default useConverSation;