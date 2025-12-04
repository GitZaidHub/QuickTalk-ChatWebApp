import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCamera, FaSave, FaPen, FaTimes, FaUser } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { storage } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";
import axios from 'axios';

const Userprofile = () => {
  const { id } = useParams();
  const { author } = useAuthContext();
  const [currentUser, setCurrentUser] = useState(null);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = author?.token;
  const isOwnProfile = !id || id === author?.id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userIdToFetch = id || author.id;
        const response = await axios.get(`/api/users/${userIdToFetch}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(response.data);
        setBio(response.data.bio || "");
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error("Failed to load profile");
      }
    };

    if (token) fetchUserProfile();
  }, [token, id, author.id]);

  const handleProfilePicUpload = async (file) => {
    if (!file || !token) return;
    if (file.size > 500000) {
      toast.error("Image size exceeds 500kb");
      return;
    }

    const storageRef = ref(storage, `profile-pictures/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error('Error uploading file:', error);
        setUploading(false);
        toast.error('Error uploading image');
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);

          await axios.put(`/api/users/change-profilepic`, { imageUrl: downloadURL }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          setCurrentUser((prev) => ({ ...prev, profilePic: downloadURL }));
          toast.success('Profile picture updated!');
        } catch (error) {
          console.error('Error updating profile picture:', error);
          toast.error('Failed to update profile picture');
          setUploading(false);
        }
      }
    );
  };

  const handleBioUpdate = async () => {
    try {
      const res = await axios.put('/api/users/update', { bio }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(res.data);
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (error) {
      console.error("Error updating bio:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!currentUser) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">

        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <IoIosArrowBack className="text-xl" />
          <span className="font-medium">Back to Chat</span>
        </Link>

        {/* Main Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">

          {/* Banner */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-blue-700 to-blue-900 relative">
            {/* Optional: Add a subtle pattern or overlay here if desired */}
          </div>

          <div className="px-6 sm:px-10 pb-10">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 -mt-16 md:-mt-20 mb-8">

              {/* Profile Picture */}
              <div className="relative group shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 bg-gray-900 ring-4 ring-gray-800 shadow-2xl">
                  <img
                    src={currentUser.profilePic}
                    alt={currentUser.fullName}
                    className="w-full h-full rounded-full object-cover bg-gray-800"
                  />
                </div>

                {isOwnProfile && (
                  <>
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-2 right-2 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg cursor-pointer transition-all transform hover:scale-105"
                      title="Change Profile Picture"
                    >
                      {uploading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <FaCamera className="text-base" />
                      )}
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleProfilePicUpload(e.target.files[0])}
                      disabled={uploading}
                    />
                  </>
                )}
              </div>

              {/* Header Info */}
              <div className="flex-1 pt-2 md:pt-24 min-w-0 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{currentUser.fullName}</h1>
                    <p className="text-blue-400 font-medium text-lg">@{currentUser.username}</p>
                  </div>

                  {isOwnProfile && !isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <FaPen className="text-sm" /> Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Bio Section - Takes up 2 columns on large screens */}
              <div className="lg:col-span-2 bg-gray-900/50 rounded-xl p-6 md:p-8 border border-gray-700/50 shadow-inner">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    <FaUser className="text-blue-500" /> About
                  </h3>
                  {isEditing && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setBio(currentUser.bio || "");
                        }}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        title="Cancel"
                      >
                        <FaTimes />
                      </button>
                      <button
                        onClick={handleBioUpdate}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                      >
                        <FaSave /> Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="relative">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full h-48 bg-gray-800 text-gray-100 p-4 rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all placeholder-gray-500 text-base leading-relaxed"
                      placeholder="Write a short bio about yourself..."
                      maxLength={30}
                      autoFocus
                    />
                    <div className="text-right text-xs text-gray-500 mt-2 font-medium">
                      {bio.length}/30 characters
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    {currentUser.bio ? (
                      <p className="text-gray-300 whitespace-pre-wrap text-lg leading-relaxed">{currentUser.bio}</p>
                    ) : (
                      <p className="text-gray-500 italic text-lg">No bio added yet.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar / Stats / Additional Info Placeholder */}
              {/* This column fills the space on the right, making the layout look more 'dashboard-like' and professional */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30">
                  <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Account Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-500 text-sm block">Member Since</span>
                      <span className="text-gray-300 font-medium">{new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm block">Email</span>
                      <span className="text-gray-300 font-medium break-all">{currentUser.email}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
