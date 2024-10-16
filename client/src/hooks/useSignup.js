import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const userSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('')
  const {  setAuthor} = useAuthContext()
  const navigate = useNavigate()
  const Signup = async (userData) => {
    seterror('')
    setLoading(true)
    try {
      const response = await axios.post(`/api/auth/signup`,userData)
      const newUser = response.data;
      if(!newUser){
        seterror('can not register')
      }
      if(!error){
        navigate("/login")
      }
      
      toast.success("successfully registered")
    } catch (error) {
      toast.error(error?.response?.data.message)
    }finally{
        setLoading(false)
    }
  }
  return { loading, Signup }; // Return the error state for use in the component
};

export default userSignup;


