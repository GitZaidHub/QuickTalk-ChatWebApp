import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/message/MessageContainer'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { author } = useAuthContext()
  const navigate = useNavigate();

  useEffect(() => {
    if (!author) {
      navigate("/landingPage")
    }
  }, [author, navigate])


  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home
