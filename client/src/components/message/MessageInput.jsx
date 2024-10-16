import React, { useState, useRef } from "react";
import useSendMsg from "../../hooks/useSendMsg";
import EmojiPicker from "emoji-picker-react";
import { IoMdClose } from "react-icons/io";
import { storage } from "../../lib/firebase"; // Firebase storage instance
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; // Firebase utils
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef(null);
  const { loading, sendMsg } = useSendMsg(); // Custom hook for sending messages
  const { author } = useAuthContext();
  const token = author?.token;

  // Handle image upload for chat
  const handleImageUploadForChat = async () => {
    if (!selectedImage || !token) return null;

    // Check file size
    if (selectedImage.size > 1000000) {
      toast.error("Image size exceeds 500kb");
      return null;
    }

    const storageRef = ref(storage, `chat-images/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    setUploading(true);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading file:", error);
          setUploading(false);
          toast.error("Error uploading image");
          reject(error); // Handle the error case
        },
        async () => {
          try {
            // Get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Image URL:", downloadURL); // Log the URL for confirmation
            setUploading(false);
            resolve(downloadURL); // Return the download URL
          } catch (error) {
            console.error("Error getting image URL:", error);
            setUploading(false);
            reject(error); // Handle the error case
          }
        }
      );
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !selectedImage) return;

    let imageUrl = null;
    if (selectedImage) {
      imageUrl = await handleImageUploadForChat();
    }

    const messageData = {
      message: message || "", // Send message text if exists
      imageUrl: imageUrl || "", // Image URL if uploaded
    };

    await sendMsg(messageData); // Send message through custom hook
    setMessage("");
    setSelectedImage(null);
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Set image for preview
    }
  };

  // Handle emoji click
  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center px-3 py-2 rounded-lg bg-slate-200 bg-opacity-60 dark:bg-gray-700 relative">
          {/* Upload Image Button */}
          <button
            type="button"
            onClick={() => imageInputRef.current.click()}
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            {/* Image Icon */}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 20 18">
              <path
                fill="currentColor"
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Emoji Picker Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            {/* Emoji Icon */}
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
              />
            </svg>
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-16">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {/* Message Input */}
          <input
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
          />

          {/* Loading Spinner or Send Button */}
          {loading || uploading ? (
            <div className="flex justify-center items-center">
              <svg
                className="w-5 h-5 animate-spin fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7335 1.05199C51.766 0.367572 46.7248 0.446837 41.7943 1.27822C39.317 1.69479 37.8401 4.19701 38.4771 6.62237C39.1142 9.04773 41.5934 10.5012 44.0722 10.1067C47.941 9.43124 51.8896 9.3997 55.7933 10.0187C60.8137 10.8271 65.5875 12.6741 69.865 15.4435C74.1426 18.213 77.819 21.8493 80.7178 26.189C83.2151 29.8543 85.1227 33.9215 86.3739 38.249C87.1486 40.6096 89.5421 41.6784 91.9676 41.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          )}

          {/* Selected Image Preview */}
          {/* Selected Image Preview with blurred background */}
          {selectedImage && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
              {/* Preview container */}
              <div className="relative p-4 border bg-white shadow-lg rounded-lg flex flex-col items-center w-[450px] transition-transform duration-300 transform hover:scale-105">
                {/* Remove button with icon space */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-0 right-0 text-black  text-xl hover:text-red-700"
                >
                  <IoMdClose />
                </button>

                {/* Image preview */}
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="preview"
                  className="w-full h-[350px] object-cover rounded-md"
                />

                {/* Send Button */}
                {loading || uploading ? (
                  <div className="flex justify-center items-center">
                    <svg
                      className="w-5 h-5 animate-spin fill-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7335 1.05199C51.766 0.367572 46.7248 0.446837 41.7943 1.27822C39.317 1.69479 37.8401 4.19701 38.4771 6.62237C39.1142 9.04773 41.5934 10.5012 44.0722 10.1067C47.941 9.43124 51.8896 9.3997 55.7933 10.0187C60.8137 10.8271 65.5875 12.6741 69.865 15.4435C74.1426 18.213 77.819 21.8493 80.7178 26.189C83.2151 29.8543 85.1227 33.9215 86.3739 38.249C87.1486 40.6096 89.5421 41.6784 91.9676 41.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-5 h-5 rotate-90 rtl:-rotate-90"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Send message</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
