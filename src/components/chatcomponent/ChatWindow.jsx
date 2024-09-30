import React, { useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaSmile,
  FaMicrophone,
  FaPaperclip,
  FaPhone,
  FaTrashAlt,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";
import UploadMedia from "./Media";
import VoiceRecorder from "./VoiceRecoder";
const socket = io("http://localhost:3000");

const ChatWindow = ({ selectedChat }) => {
  const [inputValue, setInputValue] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // Track recording state
  const [recordedAudio, setRecordedAudio] = useState(null); // Store recorded audio
  const [audioBlob, setAudioBlob] = useState(null); // Store audio blob to send

  useEffect(() => {
    if (selectedChat) {
      fetchChatMessages(selectedChat.id);
    }
  }, [selectedChat]);

  const fetchChatMessages = async (chatId) => {
    const fetchedMessages = [
      { id: 1, sender: "Me", content: "Hey, what's up?" },
      { id: 2, sender: selectedChat.name, content: selectedChat.lastMessage },
    ];
    setMessages(fetchedMessages);
  };

  const sendMessage = () => {
    if (!inputValue.trim() && !audioBlob) return; // Ensure there's a text message or audio to send

    const newMessage = {
      id: Date.now(),
      sender: "Me",
      content: inputValue || "Voice message", // If no text, label as "Voice message"
      audio: audioBlob ? URL.createObjectURL(audioBlob) : null, // Include audio if present
    };

    socket.emit("sendMessage", { ...newMessage, receiverId: selectedChat.id });

    setInputValue("");
    setRecordedAudio(null); // Clear after sending
    setAudioBlob(null); // Clear the blob
    setMessages([...messages, newMessage]);
  };

  // Handle real-time message reception
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (message.receiverId === selectedChat.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
  }, [selectedChat]);

  // Handle emoji picker
  const handleEmojiClick = (emojiObject) => {
    setInputValue(inputValue + emojiObject.emoji);
  };

  // Start or stop recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // When recording finishes
  const handleStopRecording = (blob) => {
    const url = URL.createObjectURL(blob);
    setRecordedAudio(url);
    setAudioBlob(blob);
    setIsRecording(false);
  };

  // Delete the recording
  const deleteRecording = () => {
    setRecordedAudio(null);
    setAudioBlob(null);
  };

  return (
    <div className="flex flex-col flex-grow bg-white h-full">
      {/* Top bar */}
      <div
        onClick={() => setIsEmojiPickerVisible(false)}
        className="bg-gray-100 sticky top-0 z-10"
      >
        <div className="flex items-center justify-between p-4 md:p-5 lg:p-6">
          <img
            className="w-12 h-12 rounded-full"
            src="images/blog-header.jpg"
            alt="User Profile"
          />
          <p className="font-bold text-gray-500">
            {selectedChat ? selectedChat.name : "User's Name"}
          </p>
          <button className="text-gray-500">
            <FaPhone />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto bg-gray-200 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`my-2 flex ${
              msg.sender === "Me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                msg.sender === "Me" ? "bg-gray-300" : "bg-blue-500"
              }`}
            >
              <p className="font-bold">{msg.sender}</p>
              <p>{msg.content}</p>
              {msg.audio && (
                <audio controls>
                  <source src={msg.audio} type="audio/mp3" />
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input and controls */}
      <div className="p-2 flex items-center border-t bg-blue-300 relative">
        <button className="p-2" onClick={() => setIsEmojiPickerVisible(true)}>
          <FaSmile className="text-lg" />
        </button>
        {isEmojiPickerVisible && (
          <div className="absolute bottom-full mb-2 right-4 z-20">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <button className="p-2" onClick={() => setIsUploadModalOpen(true)}>
          <FaPaperclip className="text-lg" />
        </button>

        {/* Microphone Button */}
        <button className="p-2" onClick={toggleRecording}>
          <FaMicrophone className="text-lg" />
        </button>

        {/* Voice Recorder */}
        {isRecording && (
          <div>
            <VoiceRecorder
              onRecord={setAudioBlob}
              onStop={handleStopRecording}
            />
          </div>
        )}

        {/* If a recording exists, show the preview */}
        {recordedAudio && (
          <div className="flex items-center ml-2">
            <audio controls src={recordedAudio} className="mr-2"></audio>
            <button onClick={deleteRecording}>
              <FaTrashAlt className="text-red-500" />
            </button>
          </div>
        )}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow mx-2 p-2 bg-gray-100 rounded-full outline-none"
          placeholder="Enter a message"
        />

        <button className="p-2" onClick={sendMessage}>
          <FaPaperPlane className="text-blue-700 text-lg" />
        </button>
      </div>

      {/* Upload Modal */}
      <UploadMedia
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default ChatWindow;
