import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { messageAPI } from "../utils/api";
import { getSocket } from "../utils/socket";
import { MessageList } from "./MessageList";
import "./ChatWindow.css";

export const ChatWindow = () => {
  const { state, addMessage, deleteMessage, setMessages } =
    useContext(ChatContext);
  const { currentConversation, user } = state;
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const socket = getSocket();
  const typingTimeoutRef = React.useRef(null);
  const currentUserId = user?._id || user?.id;

  useEffect(() => {
    if (currentConversation) {
      loadMessages();
    }
  }, [currentConversation]);

  const loadMessages = async () => {
    try {
      const response = await messageAPI.getMessages(currentConversation._id);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !currentConversation) return;
    if (!user || !currentUserId) return;

    try {
      const messageData = {
        conversationId: currentConversation._id,
        text: messageText,
      };

      const response = await messageAPI.sendMessage(messageData);
      addMessage(response.data);

      socket?.emit("send-message", {
        ...response.data,
        conversationId: currentConversation._id,
        username: user.username,
      });

      socket?.emit("stop-typing", {
        conversationId: currentConversation._id,
        senderId: currentUserId,
      });

      setMessageText("");
      setIsTyping(false);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleTyping = (e) => {
    setMessageText(e.target.value);
    if (!currentConversation || !user || !currentUserId) return;

    if (!isTyping && e.target.value) {
      setIsTyping(true);
      socket?.emit("typing", {
        conversationId: currentConversation._id,
        senderId: currentUserId,
        username: user.username,
      });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket?.emit("stop-typing", {
        conversationId: currentConversation._id,
        senderId: currentUserId,
      });
    }, 3000);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await messageAPI.deleteMessage(messageId);
      deleteMessage(messageId);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  if (!currentConversation) {
    return (
      <div className="chat-window-empty glass">
        <div className="empty-state">
          <div className="empty-icon">💭</div>
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  const otherUser = currentConversation.participants.find(
    (p) => p?._id !== currentUserId,
  );

  return (
    <div className="chat-window glass">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="chat-avatar">
            {otherUser?.username?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="chat-user-details">
            <h3>{otherUser?.username}</h3>
            <span className={`status badge-${otherUser?.status || "offline"}`}>
              {otherUser?.status || "offline"}
            </span>
          </div>
        </div>
      </div>

      <MessageList onDeleteMessage={handleDeleteMessage} />

      <form onSubmit={handleSendMessage} className="message-input-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={messageText}
            onChange={handleTyping}
            placeholder="Type a message..."
            className="message-input"
          />
          <button
            type="submit"
            className="btn-send"
            disabled={!messageText.trim()}
            title="Send message"
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
};
