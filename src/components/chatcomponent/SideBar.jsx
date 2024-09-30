import React from "react";
import StoryIcon from "./StoryIcon";
import SearchBar from "./SearchBar";
import ChatList from "./ChatList";
import MenuSidebar from "./MenuSidebar";

const Sidebar = ({ selectedChat, setSelectedChat }) => {
  return (
<div className="hidden md:flex top-0 z-10 md:flex-col md:w-1/4 lg:w-1/4 bg-blue-500 h-screen p-4 border-2 border-blue-800">
<div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Chats</h2>
          <StoryIcon />
          <MenuSidebar />
        </div>
        <SearchBar />
      </div>
      <ChatList selectedChat={selectedChat} setSelectedChat={setSelectedChat} />{" "}
    </div>
  );
};

export default Sidebar;
