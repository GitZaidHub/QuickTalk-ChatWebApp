import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaCheck } from 'react-icons/fa';
import { storage } from '../lib/firebase'; // Firebase storage instance
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";
import axios from 'axios';

const Userprofile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isProfilePicTouched, setIsProfilePicTouched] = useState(false);
  const { author } = useAuthContext(); // Context to get the logged-in user
  const [currentUser, setCurrentUser] = useState(null); // Initialize as null for better logic
  const token = author?.token;

  // Fetch user profile once when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${author.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUser(response.data); // Store user data
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (token) {
      fetchUserProfile(); // Call API only if the user is authenticated
    }
  }, [token]);

  // Function to upload profile pic to Firebase Storage
  const handleProfilePicUpload = () => {
    if (!profilePic || !token) return; // Validate inputs
    if(profilePic.size > 500000) {
      toast.error("pic size exceeds 500kb")
      return;
    }

    const storageRef = ref(storage, `profile-pictures/${profilePic.name}`);
    const uploadTask = uploadBytesResumable(storageRef, profilePic);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Error uploading file:', error);
        setUploading(false);
        toast.error('Error in uploading profile picture');
      },
      async () => {
        try {
          // File uploaded successfully, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);
          setIsProfilePicTouched(false);

          // Send the image URL to the backend to update user profile
          await axios.put(`/api/users/change-profilepic`, { imageUrl: downloadURL }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Update current user data locally with the new image URL
          setCurrentUser((prevUser) => ({
            ...prevUser,
            imageUrl: downloadURL // Update the image in the currentUser state
          }));

          toast.success('Profile picture updated successfully');
        } catch (error) {
          console.error('Error updating profile picture:', error);
          toast.error('Error in updating profile picture');
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center bg-[#f1f5f9] h-1/2 md:w-1/2 w-3/4 rounded-3xl border border-black relative">
      <Link to="/" className='absolute text-white left-1 flex justify-center items-center m-2 rounded-xl px-2 py-1 bg-slate-500 hover:bg-[#f1f5f9] hover:text-gray-800'>
        <IoIosArrowRoundBack className='text-2xl' /> Chats
      </Link>
      <h1 className="font-semibold py-10 text-xl md:text-3xl">Profile</h1>

      {/* Profile image container */}
      <div className="relative w-44 h-44 rounded-full border border-black overflow-hidden">
        <img
          src={currentUser?.profilePic }
          alt="Profile"
          className="object-cover w-full h-full"
        />

        {/* Edit Icon */}
        <label
          htmlFor="avatar"
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer transition"
          onClick={() => setIsProfilePicTouched(true)}
        >
          <FaRegEdit className="text-xl text-gray-600" />
        </label>

        {/* Hidden file input */}
        <input
          className="hidden"
          type="file"
          name="avatar"
          id="avatar"
          accept="image/png, image/jpeg"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
      </div>

      {/* Display username */}
      <div className="text-xl py-2">@ {currentUser?.username}</div>

      {/* Save Button */}
      {isProfilePicTouched && (
        <button
          onClick={handleProfilePicUpload}
          disabled={uploading}
          className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          {uploading ? 'Uploading...' : <FaCheck className="text-green-600 text-xl" />}
        </button>
      )}
    </div>
  );
};

export default Userprofile;
