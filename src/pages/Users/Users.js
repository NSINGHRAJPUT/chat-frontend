import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import io from "socket.io-client";
import ChatBox from "../../component/ChatBox";
import { base } from "../../api";

const socket = io(base);

function Users() {
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatid, setchatid] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const cookies = new Cookies();
  const name = cookies.get("name");
  const token = cookies.get("token");
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", ({ chatId, message }) => {
      console.log("not working");
      console.log(chatid, chatId);
      if (chatid === chatId) {
        console.log("working");
        setChatMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [chatid, selectedUser]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.post(`${base}/feed/getChats`, {
          receiver: selectedUser?._id,
          token: token,
        });
        setChatMessages(response.data[0]?.messages || []);
        setchatid(response.data[0]._id);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    if (selectedUser) {
      fetchChats();
    }
  }, [token, selectedUser]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      setMessage("");
      scrollToBottom();
    }
    try {
      await axios.post(`${base}/feed`, {
        receiver: selectedUser?._id,
        senderName: name,
        token: token,
        content: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="bg-gray-200 p-4 overflow-y-auto h-full w-2/5">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <ul className="divide-y divide-gray-200">
            {location.state.map((user, index) => (
              <li
                className="flex items-center py-4 px-6 cursor-pointer"
                onClick={() => handleSelectUser(user)}
                key={index}
              >
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src="https://randomuser.me/api/portraits/men/40.jpg"
                  alt="User avatar"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {user.name === name ? "message yourself" : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white w-full p-4 py-0 h-full flex flex-col justify-between">
          {selectedUser ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {selectedUser.name}
              </h2>
              <div
                ref={messagesContainerRef}
                className="border-t border-gray-300 pt-4 overflow-y-auto custom-scrollbar"
                style={{ maxHeight: "85vh" }} // Adjust the max height as needed
              >
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.senderName === name ? "text-right mb-2" : "mb-2"
                    }
                  >
                    <strong>{msg.senderName}: </strong>
                    {msg.content}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Select a user to start chatting</p>
          )}
          <ChatBox
            messagesContainerRef={messagesContainerRef}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </>
  );
}

export default Users;
