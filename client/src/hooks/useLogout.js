import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthor } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
        localStorage.removeItem('user');
      // Clear user context and navigate to login
      setAuthor(null);
      navigate("/login");
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Error logging out");
    } finally {
      setLoading(false); // Set loading back to false after the logout process
    }
  };

  return { loading, logout };
};

export default useLogout;
