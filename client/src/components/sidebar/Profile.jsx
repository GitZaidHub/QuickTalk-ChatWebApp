import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const { author } = useAuthContext()

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`/api/users/${author.id}`)
        setCurrentUser(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (author?.id) {
      getAuthor();
    }
  }, [author?.id])

  if (!currentUser) return null;

  return (
    <div className="w-full">
      <Link to={`/${currentUser?.id}`} className="group block">
        <div className="flex items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:bg-slate-50">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
              <img
                className="object-cover w-full h-full rounded-full border-2 border-white"
                src={currentUser?.profilePic}
                alt={currentUser?.username}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="flex flex-col overflow-hidden">
            <h3 className="text-slate-900 font-bold text-sm truncate group-hover:text-indigo-600 transition-colors">
              {currentUser?.fullName}
            </h3>
            <p className="text-slate-500 text-xs truncate">
              {currentUser?.bio || "Available"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
