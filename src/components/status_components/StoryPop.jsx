import React, { useState } from "react";
import axios from "axios";

function StoryPopup({ onClose }) {
  const [media, setMedia] = useState(null);
  const [textContent, setTextContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
  };

  const handlePostStory = async () => {
    setIsPosting(true);
    const formData = new FormData();
    formData.append("media", media);
    formData.append("textContent", textContent);

    try {
      await axios.post("http://localhost:3000/stories/add-stories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onClose();
    } catch (error) {
      console.error("Error posting story", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl mb-4">Add Your Story</h2>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
          className="mb-4"
        />
        <textarea
          value={textContent}
          onChange={handleTextChange}
          placeholder="Add text or caption..."
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handlePostStory}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isPosting}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryPopup;
