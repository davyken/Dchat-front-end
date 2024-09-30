import React, { useState, useContext } from "react";
import axios from "axios";
import { useAuthProvider } from "../../../context/AuthContext";

const UserName = ({ currentUsername, onUpdate }) => {
  const { user } = useAuthProvider();

  const [username, setUsername] = useState(currentUsername);
  const [password, setPassword] = useState("");
  const [isEditting, setIsEditting] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/update/edit-details",
        { id: user.id, username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onUpdate(response.data.username);
      setIsEditting(false);
    } catch (error) {
      console.error("Error updating username", error);
    }
  };

  const handleEdit = () => {
    setIsEditting(true);
  };

  return (
    <div className="mb-4">
      {isEditting ? (
        <>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            onClick={handleSave}
            className="mt-2 w-28 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Username
          </button>
        </>
      ) : (
        <>
          {" "}
          <p className="font-bold h-20">{username}</p>{" "}
          <button
            onClick={handleEdit}
            className="mt-2 w-28 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Edit{" "}
          </button>{" "}
        </>
      )}
    </div>
  );
};

export default UserName;
