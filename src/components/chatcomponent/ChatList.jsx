import React from "react";

const chats = [
  { id: 1, name: "User", lastMessage: "Hello there!" },
 
];

const ChatList = ({ selectedChat, setSelectedChat }) => {
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="h-full overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => handleChatClick(chat)}
          className={`py-5 hover:bg-blue-500 cursor-pointer rounded-lg flex items-center gap-4 border-b border-blue-600 transition-all ${
            selectedChat && selectedChat.id === chat.id ? "bg-blue-400" : ""
          }`}
        >
          <img
            className="w-16 h-16 rounded-full"
            src="images/blog-header.jpg"
            alt={chat.name}
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{chat.name}</h3>
            <p className="text-gray-100 truncate max-w-xs">
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
