import {React,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
const Profile = () => {
  const [currentUser, setCurrentUser] = useState([])
  const {author} = useAuthContext()
  

  useEffect(() => {
    const getAuthor = async()=>{
      try {
        const response = await axios.get(`/api/users/${author.id}`)
        setCurrentUser(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
    if(author?.id){
      getAuthor();
    }
    
  }, [])
  
  return (
    <div className="flex justify-between p-3 w-full">
      <Link to={`/${currentUser?.id}`}>
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <img className="object-cover w-full h-full" src={currentUser?.profilePic } alt="" />
        </div>
      </Link>
      <SearchInput/>
    </div>
  );
};

export default Profile;
