import React, { useState, useRef } from "react";
import useSendMsg from "../../hooks/useSendMsg";
import EmojiPicker from "emoji-picker-react";
import { Image, Smile, Send, X, Loader2 } from "lucide-react";
import { storage } from "../../lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef(null);
  const { loading, sendMsg } = useSendMsg();
  const { author } = useAuthContext();
  const token = author?.token;

  const handleImageUploadForChat = async () => {
    if (!selectedImage || !token) return null;

    if (selectedImage.size > 1000000) {
      toast.error("Image size exceeds 1MB");
      return null;
    }

    const storageRef = ref(storage, `chat-images/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    setUploading(true);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading file:", error);
          setUploading(false);
          toast.error("Error uploading image");
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting image URL:", error);
            setUploading(false);
            reject(error);
          }
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !selectedImage) return;

    let imageUrl = null;
    if (selectedImage) {
      imageUrl = await handleImageUploadForChat();
    }

    const messageData = {
      message: message || "",
      imageUrl: imageUrl || "",
    };

    await sendMsg(messageData);
    setMessage("");
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        {/* Image Upload */}
        <button
          type="button"
          onClick={() => imageInputRef.current.click()}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
        >
          <Image size={20} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Emoji Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
          >
            <Smile size={20} />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-50 shadow-xl rounded-xl border border-slate-200">
              <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={400} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            className="w-full py-2.5 px-4 text-sm text-slate-900 bg-slate-100 border-transparent rounded-full focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder-slate-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading || uploading || (!message && !selectedImage)}
          className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          {loading || uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>

        {/* Image Preview Overlay */}
        {selectedImage && (
          <div className="absolute bottom-full left-0 mb-4 ml-4 z-20 animate-in slide-in-from-bottom-2">
            <div className="relative bg-white p-2 rounded-xl shadow-lg border border-slate-200">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
