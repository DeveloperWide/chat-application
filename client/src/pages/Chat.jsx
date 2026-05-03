import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { authAPI, messageAPI } from "../utils/api";
import { initializeSocket, getSocket, disconnectSocket } from "../utils/socket";
import { ConversationList } from "../components/ConversationList";
import { ChatWindow } from "../components/ChatWindow";
import { UserList } from "../components/UserList";
import "./Chat.css";

export const Chat = ({ onLogout }) => {
  const {
    state,
    setUser,
    setUsers,
    setConversations,
    setCurrentConversation,
    setMessages,
    addMessage,
    setTypingUser,
    removeTypingUser,
    updateUserStatus,
  } = useContext(ChatContext);
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Get user profile
        const profileResponse = await authAPI.getProfile();
        setUser(profileResponse.data);

        // Get all users
        const usersResponse = await authAPI.getAllUsers();
        setUsers(usersResponse.data);

        // Get conversations
        const conversationsResponse = await messageAPI.getConversations();
        setConversations(conversationsResponse.data);

        // Initialize Socket.IO
        const socket = initializeSocket();

        // Join user room
        socket.emit("user-join", profileResponse.data._id);

        // Socket events
        socket.on("receive-message", (message) => {
          addMessage(message);
        });

        socket.on("user-typing", ({ senderId, username }) => {
          setTypingUser(senderId);
        });

        socket.on("user-stop-typing", ({ senderId }) => {
          removeTypingUser(senderId);
        });

        socket.on("user-status", ({ userId, status }) => {
          updateUserStatus(userId, status);
        });

        return () => {
          socket.off("receive-message");
          socket.off("user-typing");
          socket.off("user-stop-typing");
          socket.off("user-status");
        };
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    };

    initializeChat();

    return () => {
      disconnectSocket();
    };
  }, []);

  const handleSelectConversation = (conversation) => {
    setCurrentConversation(conversation);
    const socket = getSocket();
    socket?.emit("join-conversation", conversation._id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    disconnectSocket();
    onLogout();
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <ConversationList onSelectConversation={handleSelectConversation} />
        <ChatWindow />
      </div>

      <div className="chat-controls">
        <button
          className="btn btn-primary btn-new-chat"
          onClick={() => setShowUserList(true)}
        >
          + New Chat
        </button>
        <button className="btn btn-secondary btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {showUserList && (
        <UserList
          onUserSelect={() => setShowUserList(false)}
          onClose={() => setShowUserList(false)}
        />
      )}
    </div>
  );
};
