import { React, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import useFriendRequest from "../../hooks/useFriendRequest";
import { Search, UserPlus, UserCheck, Clock, ArrowRight } from "lucide-react";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { author } = useAuthContext();
  const { sendFriendRequest } = useFriendRequest();
  const token = author?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Minimum 3 letters required for search");
    }

    try {
      const res = await axios.get(`/api/users/search?query=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.error) throw new Error(res.data.error);

      if (res.data.length === 0) {
        toast.error("User not found");
      }
      setSearchResults(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSendRequest = async (receiverId) => {
    const success = await sendFriendRequest(receiverId);
    if (success) {
      setSearchResults(prev => prev.map(user =>
        user._id === receiverId ? { ...user, friendshipStatus: 'pending' } : user
      ));
    }
  };

  return (
    <div className="relative w-full">
      <form className="relative" onSubmit={handleSubmit}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full py-2.5 pl-10 pr-10 text-sm text-slate-900 border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 hover:text-indigo-700"
          >
            <ArrowRight size={16} />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl max-h-96 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="sticky top-0 z-10 flex justify-between items-center p-3 bg-slate-50/90 border-b border-slate-100 backdrop-blur-sm">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Found {searchResults.length} Users</span>
            <button
              onClick={() => {
                setSearchResults([]);
                setSearch("");
              }}
              className="text-slate-400 hover:text-slate-600 text-xs transition-colors font-medium"
            >
              Close
            </button>
          </div>

          <div className="p-2 space-y-1">
            {searchResults.map((user) => (
              <div key={user._id} className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Link to={`/${user._id}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative shrink-0">
                      <img src={user.profilePic} alt={user.username} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${user.friendshipStatus === 'accepted' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-slate-900 text-sm font-semibold truncate group-hover:text-indigo-600 transition-colors">{user.fullName}</span>
                      <span className="text-slate-500 text-xs truncate">@{user.username}</span>
                    </div>
                  </Link>
                </div>

                <div className="shrink-0 ml-2">
                  {user.friendshipStatus === 'accepted' ? (
                    <span className="flex items-center gap-1 text-emerald-600 text-xs bg-emerald-50 px-2 py-1 rounded-full font-medium">
                      <UserCheck size={12} /> Friend
                    </span>
                  ) : user.friendshipStatus === 'pending' ? (
                    <span className="flex items-center gap-1 text-amber-600 text-xs bg-amber-50 px-2 py-1 rounded-full font-medium">
                      <Clock size={12} /> Sent
                    </span>
                  ) : user.friendshipStatus === 'incoming_pending' ? (
                    <span className="flex items-center gap-1 text-blue-600 text-xs bg-blue-50 px-2 py-1 rounded-full font-medium">
                      Incoming
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSendRequest(user._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 active:scale-95 transition-all shadow-sm hover:shadow-md"
                    >
                      <UserPlus size={14} /> Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
