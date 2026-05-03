import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { messageAPI } from "../utils/api";
import "./UserList.css";

export const UserList = ({ onUserSelect, onClose }) => {
  const { state, setCurrentConversation } = useContext(ChatContext);
  const { users } = state;
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserClick = async (userId) => {
    try {
      const conversation = await messageAPI.getOrCreateConversation(userId);
      setCurrentConversation(conversation.data);
      onUserSelect();
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  return (
    <div className="user-list-overlay">
      <div className="user-list-modal glass">
        <div className="user-list-header">
          <h2>Select a User</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="users-search">
          <input
            type="text"
            placeholder="Search users..."
            className="search-input"
          />
        </div>

        <div className="users-grid">
          {users.length === 0 ? (
            <div className="empty-users">
              <p>No users available</p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="user-card glass-card"
                onClick={() => handleUserClick(user._id)}
              >
                <div className="user-card-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="user-card-info">
                  <h4>{user.username}</h4>
                  <span className={`badge badge-${user.status || "offline"}`}>
                    {user.status || "offline"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
