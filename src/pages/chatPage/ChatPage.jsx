import React, { useState } from "react";
import Sidebar from "../../components/chatcomponent/SideBar";
import ChatWindow from "../../components/chatcomponent/ChatWindow";
import MobileNavBar from "../../components/chatcomponent/MobileNav";
import { Outlet } from "react-router-dom";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar setSelectedChat={setSelectedChat} />
      <div className="flex flex-col flex-grow">
        {selectedChat ? (
          <ChatWindow selectedChat={selectedChat} />
        ) : (
          <div className="flex-grow p-4 text-center">
            <h2 className="text-gray-600 text-center font-semibold">
              Select a chat to start messaging
            </h2>
          </div>
        )}
        <MobileNavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default ChatPage;
