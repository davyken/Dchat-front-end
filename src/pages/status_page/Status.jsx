import React from "react";
import AddStory from "../../components/status_components/AddStory";
import RecentStory from "../../components/status_components/RecentStory";
import ViewStory from "../../components/status_components/ViewStory";
import MobileNavBar from "../../components/chatcomponent/MobileNav";

function Status() {
  return (
    <div className="flex flex-col px-2 py-3 bg-blue-500">
      <h1 className="font-bold">Status</h1>
      <AddStory />
      <RecentStory />
      <ViewStory />
      <MobileNavBar />
    </div>
  );
}

export default Status;
