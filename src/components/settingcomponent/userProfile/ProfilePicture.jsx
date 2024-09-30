import React, { useState, useContext } from "react";
import axios from "axios";
import { useAuthProvider } from "../../../context/AuthContext";

const ProfilePicture = ({ currentPicture, onUpdate }) => {
  const { user } = useAuthProvider();
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewSource, setPreviewSource] = useState(currentPicture);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreviewSource(URL.createObjectURL(file));
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    setPreviewSource(null);
  };

  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", profilePicture);

    try {
      const response = await axios.put(
        "http://localhost:3000/update/edit-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onUpdate(response.data.data.profile_picture);
      setUploading(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error uploading profile picture", error);
      setUploading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="mb-4">
      {isEditing ? (
        <>
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture:
          </label>
          {previewSource ? (
            <div className="flex flex-col items-center">
              <div className="relative  mb-2">
                <img
                  src={previewSource}
                  alt="Profile"
                  className="w-full h-full rounded-full shadow-md object-cover"
                />
                <button
                  onClick={handleRemovePicture}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                  style={{ transform: "translate(50%, -50%)" }}
                >
                  ✖️
                </button>
              </div>
              <button
                onClick={handleUpload}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Save Picture"}
              </button>
            </div>
          ) : (
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          )}
        </>
      ) : (
        <>
          <div className=" mb-2">
            <img
              src={previewSource}
              alt="Profile"
              className="w-full h-full rounded-full shadow-md object-cover"
            />
            <button
              onClick={handleEdit}
              className=" w-28 bg-blue-500 text-white  hover:bg-blue-600 focus:outline-none"
              style={{ transform: "translate(50%, -50%)" }}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePicture;
