import { createContext, useContext,useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children})=>{
    const [author, setAuthor] = useState(JSON.parse(localStorage.getItem('user')) || null)
    

    return <AuthContext.Provider value={{author,setAuthor}} >{children}</AuthContext.Provider>
}