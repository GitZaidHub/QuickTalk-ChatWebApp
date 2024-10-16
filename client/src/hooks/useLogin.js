import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const useLogin = () => {
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const {  setAuthor } = useAuthContext();

  const Login = async (userData) => {
    setLoading(true);
    seterror("");
    try {
      const response = await axios.post(`/api/auth/login`, userData);
      const newUser = await response.data;
      if (!newUser) {
        toast.error("An error in login");
      }
      localStorage.setItem('user',JSON.stringify(newUser))
      setAuthor(newUser)
      
      toast.success("User Logged in");
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, Login };
};

export default useLogin;
