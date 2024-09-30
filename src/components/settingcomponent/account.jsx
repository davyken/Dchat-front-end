import React, { useState, useContext, useEffect } from "react";
import ProfilePicture from "./userProfile/ProfilePicture";
import UserName from "./userProfile/UserName";
import StatusMessage from "./userProfile/StatusMessage";
import Bio from "./userProfile/Bio";
import { fetchParticularUser } from "../../apiCalls";
import { useAuthProvider } from "../../context/AuthContext";

const UpdateProfile = () => {
  const { user } = useAuthProvider();

  const [userBio, setUserBio] = useState("");
  const [userStatusMessage, setUserStatusMessage] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [userName, setUserName] = useState("");

  const handleUpdate = (key, value) => {
    if (key === "bio") setUserBio(value);
    if (key === "status_message") setUserStatusMessage(value);
    if (key === "profile_picture") setUserProfilePicture(value);
    if (key === "username") setUserName(value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.id) {
        try {
          const response = await fetchParticularUser(user.id);
          setUserBio(response.data.bio);
          setUserStatusMessage(response.data.status_message);
          setUserProfilePicture(response.data.profile_picture);
          setUserName(response.data.username);
        } catch (error) {
          console.error("Error fetching user profile", error);
        }
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className="bg-gray-200 p-4">
      <div className="">
        <div className="flex justify-center mb-4">
          {console.log(userProfilePicture)}
          <ProfilePicture
            currentPicture={userProfilePicture || "images/blog-header.jpg"}
            onUpdate={(value) => handleUpdate("profile_picture", value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex flex-col">
            <UserName
              currentUsername={userName}
              onUpdate={(value) => handleUpdate("username", value)}
            />
          </div>
          <div className="flex flex-col">
            {console.log(userBio)}
            <Bio
              currentBio={
                userBio ||
                "You can add a short description about yourself so people know who you are."
              }
              onUpdate={(value) => handleUpdate("bio", value)}
            />
          </div>
          <div className="flex flex-col">
            <StatusMessage
              currentStatus={userStatusMessage || "Add your status message"}
              onUpdate={(value) => handleUpdate("status_message", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
