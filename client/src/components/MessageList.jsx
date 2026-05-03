import React, { useContext, useRef, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import "./MessageList.css";

export const MessageItem = ({ message, isOwn, onDelete }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const senderUsername =
    typeof message.senderId === "object" ? message.senderId?.username : "";

  return (
    <div className={`message-wrapper ${isOwn ? "own" : ""}`}>
      {!isOwn && (
        <div className="message-avatar">
          {senderUsername ? senderUsername.charAt(0).toUpperCase() : "?"}
        </div>
      )}

      <div className={`message ${isOwn ? "own" : "other"}`}>
        <div className="message-content">{message.text}</div>
        <div className="message-meta">
          <span className="time">{formatTime(message.createdAt)}</span>
          {isOwn && (
            <button
              className="delete-btn"
              onClick={() => onDelete(message._id)}
              title="Delete message"
            >
              ✕
            </button>
          )}
          {isOwn && message.isRead && (
            <span className="read-indicator">✓✓</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const MessageList = ({ onDeleteMessage }) => {
  const { state } = useContext(ChatContext);
  const { messages, typingUsers, user } = state;
  const scrollEndRef = useRef(null);
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const currentUserId = user?._id || user?.id || storedUser?._id || storedUser?.id;

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list glass">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-messages">
            <div className="empty-icon">💬</div>
            <p>Start a conversation</p>
            <p className="text-secondary">Send your first message!</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageItem
              key={message._id}
              message={message}
              isOwn={
                (typeof message.senderId === "string"
                  ? message.senderId
                  : message.senderId?._id) === currentUserId
              }
              onDelete={onDeleteMessage}
            />
          ))
        )}

        {Object.keys(typingUsers).length > 0 && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="typing-text">Someone is typing...</span>
          </div>
        )}

        <div ref={scrollEndRef} />
      </div>
    </div>
  );
};
