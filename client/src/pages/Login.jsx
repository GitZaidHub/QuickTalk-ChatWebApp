import { React, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [userData, setuserData] = useState({
    fullName: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const {author,setAuthor} = useAuthContext();
  const navigate = useNavigate()

  
  useEffect(() => {
    if(author){
      navigate("/")
    }
  }, [author])

  const { loading, Login } = useLogin();
  const handleChange = (e) => {
    setuserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login(userData);
  };

  return (
    <div className="bg-[#f1f5f9] rounded-lg shadow-lg md:h-3/4 md:w-3/4 w-full md:gap-24  h-full flex md:flex-row flex-col items-center justify-center p-6 md:p-10">
  {/* Image Section */}
  <div className="md:w-1/3 h-auto">
    <img className="rounded-lg md:w-full w-3/4 md:h-auto h-3/4 object-cover" src="/login1.png" alt="Login Illustration" />
  </div>

  {/* Form Section */}
  <form className="md:w-1/3 w-[90%]" onSubmit={handleSubmit}>
    <h1 className="text-2xl md:text-4xl py-4 font-semibold text-gray-800 text-center md:text-left">Log In</h1>

    {/* Username Input */}
    <div className="mb-6">
      <label
        htmlFor="username"
        className="block mb-2 text-sm font-medium text-gray-800"
      >
        Your Username
      </label>
      <input
        type="text"
        name="username"
        value={userData.username}
        onChange={handleChange}
        className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200 ease-in-out"
        placeholder="Username"
        required
      />
    </div>

    {/* Password Input */}
    <div className="mb-6">
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-800"
      >
        Your Password
      </label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-200 ease-in-out"
        placeholder="Password"
        required
      />
    </div>

    {/* Submit Button */}
    <div className="flex justify-between  gap-3 items-center mb-4">
    <button
  type="submit"
  disabled={loading}
  className={`text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 lg:font-medium rounded-lg text-sm lg:px-6 px-2 lg:py-3 py-1 transition-all duration-200 ease-in-out flex items-center justify-center ${
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
    "Log In"
  )}
</button>

      <small className="text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800">
          Signup
        </Link>
      </small>
    </div>
  </form>
</div>

  );
};

export default Login;
