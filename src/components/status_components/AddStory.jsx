import React, { useState, useEffect } from "react";
import { useAuthProvider } from "../../context/AuthContext";
import { fetchParticularUser } from "../../apiCalls";
import StoryPopup from "./StoryPop";
import { Link } from "react-router-dom";

function AddStory() {
  const { user } = useAuthProvider();
  const [userDetails, setUserDetails] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.id) {
        try {
          const response = await fetchParticularUser(user.id);
          setUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user profile", error);
        }
      }
    };

    fetchUser();
  }, [user]);

  const handleAddStoryClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div>
      <button onClick={handleAddStoryClick} className="text-center">
        Add Story
      </button>
      <div className="flex flex-2 border-b border-blue-700 py-2 items-center justify-between">
        <Link to={"/status"}>
          <img
            className="w-20 h-20 rounded-full"
            src={userDetails?.profile_picture || "images/blog-header.jpg"}
            alt=""
          />
        </Link>
        <p>5 hours ago</p>
        <h1 className="bold">...</h1>
      </div>
      {isPopupOpen && <StoryPopup onClose={() => setIsPopupOpen(false)} />}{" "}
    </div>
  );
}

export default AddStory;
