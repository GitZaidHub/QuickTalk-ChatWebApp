import { createContext ,useState,useEffect, useContext} from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

export const SocketContext = createContext()

export const useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children})=>{

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {author} = useAuthContext()
    useEffect(() => {
      if(author){
        const socket = io('https://quicktalk-chatwebapp.onrender.com',{
            query:{
                userId: author.id,
            }
        });
        setSocket(socket)

        socket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users)
        })
        return () =>socket.close()
      }else{
        if(socket){
            socket.close();
            setSocket(null)
        }
      }
    }, [author])
    
    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}