import React, {useEffect} from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/message/MessageContainer'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {author,setAuthor} = useAuthContext()
  const navigate = useNavigate();
  useEffect(() => {
    if(!author){
      navigate("/login")
    }
  }, [])
  

  return (
    <div className="flex md:h-[90%] h-[99%] w-[99%] mx-3 md:w-[90%]  container sm:mx-11 bg-[#f1f5f9] rounded-lg overflow-hidden  ">
      <Sidebar/>
      <MessageContainer/>   
    </div>
  )
}

export default Home
