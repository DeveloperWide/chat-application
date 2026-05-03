import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  getProfile: () => apiClient.get("/auth/profile"),
  getAllUsers: () => apiClient.get("/auth/users"),
  updateStatus: (status) => apiClient.put("/auth/status", { status }),
};

export const messageAPI = {
  getOrCreateConversation: (userId) =>
    apiClient.post("/messages/conversation", { userId }),
  getConversations: () => apiClient.get("/messages/conversations"),
  getMessages: (conversationId) =>
    apiClient.get(`/messages/messages/${conversationId}`),
  sendMessage: (data) => apiClient.post("/messages/send", data),
  markAsRead: (conversationId) =>
    apiClient.put("/messages/read", { conversationId }),
  deleteMessage: (messageId) =>
    apiClient.delete(`/messages/messages/${messageId}`),
};

export default apiClient;
