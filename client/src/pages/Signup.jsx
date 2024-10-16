import { React, useEffect, useState } from "react";
import userSignup from "../hooks/useSignup";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const Signup = () => {
  const [userData, setuserData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const {author} =useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {
    if(author){
      navigate("/")
    }
  }, [author])
  

  const { loading, Signup } = userSignup();
  const handleChange = (e) => {
    setuserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Signup(userData);
  };
  return (
    <div className="container bg-[#f1f5f9] rounded-lg shadow-lg md:h-3/4 md:w-3/4 md:gap-24  w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-10 ">
  {/* Image Section */}
  <div className="w-1/2 ">
    <img className="rounded-lg w-full h-auto object-cover" src="/signup.webp" alt="Sign Up Illustration" />
  </div>

  {/* Form Section */}
  <div className="md:w-1/2 w-full flex flex-col items-center">
    <h1 className="text-2xl md:text-4xl py-4 font-semibold text-gray-800">Sign Up</h1>

    <form className="md:w-2/3 w-[90%] h-[60vh] " onSubmit={handleSubmit}>
      {/* Full Name Input */}
      <div className="md:mb-5 mb-2">
        <label
          htmlFor="fullName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your Name
        </label>
        <input
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200 ease-in-out"
          placeholder="Enter Full Name"
          required
        />
      </div>

      {/* Username Input */}
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your Username
        </label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200 ease-in-out"
          placeholder="Enter Username"
          required
        />
      </div>

      {/* Password Input */}
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your Password
        </label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200 ease-in-out"
          placeholder="Enter Password"
          required
        />
      </div>

      {/* Confirm Password Input */}
      <div className="mb-5">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200 ease-in-out"
          placeholder="Repeat Password"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-between gap-3 items-center mb-3">
      <button
  type="submit"
  disabled={loading}
  className={`text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 transition-all duration-200 ease-in-out flex items-center justify-center ${
    loading ? `cursor-not-allowed opacity-50` : `cursor-pointer`
  }`}
>
  {loading ? (
    <div role="status" className="flex items-center">
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-200 animate-spin fill-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="ml-2">Loading...</span>
    </div>
  ) : (
    "Signup"
  )}
</button>

        <small className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </small>
      </div>
    </form>
  </div>
</div>

  );
};

export default Signup;
