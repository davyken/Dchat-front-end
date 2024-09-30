import React, { useState, useContext } from "react";
import axios from "axios";
import { useAuthProvider } from "../../../context/AuthContext";

const StatusMessage = ({ currentStatus, onUpdate }) => {
  const { user } = useAuthProvider();

  const [statusMessage, setStatusMessage] = useState(currentStatus);
  const [isEditting, setIsEditting] = useState(false);

  const handleStatusMessageChange = (e) => {
    setStatusMessage(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/update/edit-details",
        { id: user.id, status_message: statusMessage },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onUpdate(response.data.status_message);
      setIsEditting(false);
    } catch (error) {
      console.error("Error updating status message", error);
    }
  };

  const handleEdit = () => {
    setIsEditting(true);
  };

  return (
    <div className="mb-4">
      {isEditting ? (
        <>
          {" "}
          <textarea
            value={statusMessage}
            onChange={handleStatusMessageChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />{" "}
          <button
            onClick={handleSave}
            className="mt-2 w-28 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Status
          </button>
        </>
      ) : (
        <>
          <p className=" font-bold h-20">{statusMessage}</p>{" "}
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

export default StatusMessage;
