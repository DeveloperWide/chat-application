import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import "./ConversationList.css";

export const ConversationList = ({ onSelectConversation }) => {
  const { state } = useContext(ChatContext);
  const { conversations, currentConversation, user: currentUser } = state;

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const currentUserId = currentUser?._id || currentUser?.id || storedUser?._id || storedUser?.id;

  const getOtherUser = (conversation) => {
    if (!conversation?.participants?.length) return undefined;
    if (!currentUserId) return conversation.participants[0];
    return (
      conversation.participants.find((p) => p?._id !== currentUserId) ||
      conversation.participants[0]
    );
  };

  const formatTime = (date) => {
    const now = new Date();
    const msgDate = new Date(date);
    const diffMs = now - msgDate;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`;
    return msgDate.toLocaleDateString();
  };

  return (
    <div className="conversation-list glass">
      <div className="conversation-header">
        <h2>Messages</h2>
      </div>

      <div className="conversations-scroll">
        {conversations.length === 0 ? (
          <div className="empty-state">
            <p>No conversations yet</p>
            <p className="text-secondary">Start a new conversation!</p>
          </div>
        ) : (
          conversations.map((conversation) => {
            const otherUser = getOtherUser(conversation);
            const isActive = currentConversation?._id === conversation._id;

            return (
              <div
                key={conversation._id}
                className={`conversation-item ${isActive ? "active" : ""}`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="conversation-avatar">
                  {otherUser?.username?.charAt(0)?.toUpperCase() || "?"}
                </div>

                <div className="conversation-info">
                  <div className="conversation-name">{otherUser?.username}</div>
                  <div className="conversation-preview">
                    {conversation.lastMessage?.text || "No messages yet"}
                  </div>
                </div>

                <div className="conversation-meta">
                  <span
                    className={`status-badge badge-${otherUser?.status || "offline"}`}
                  ></span>
                  <span className="time">
                    {formatTime(conversation.updatedAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
