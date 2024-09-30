import React from "react";
import UpdateProfile from "../../components/settingcomponent/account";
import MobileNavBar from "../../components/chatcomponent/MobileNav";

const ProfilePage = () => {
  return (
    <>
      <div className="bg-slate-500">
        <h1 className="font-semibold text-center px-2 py-3">
          Manage Your Profile Info
        </h1>
        <UpdateProfile />
        <MobileNavBar />
      </div>
    </>
  );
};

export default ProfilePage;
