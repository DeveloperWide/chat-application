import React, { useState, useEffect } from "react";
import { ChatProvider } from "./context/ChatContext";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Chat } from "./pages/Chat";
import { ToastContainer } from "./components/Toast";
import "./styles/globals.css";

function AppContent({ addToast }) {
  const [authMode, setAuthMode] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    addToast("Welcome! Redirecting to chat...", "success", 2000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    addToast("Logged out successfully", "success", 2000);
  };

  if (loading) {
    return (
      <div
        className="glass"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Chat onLogout={handleLogout} />;
  }

  if (authMode === "register") {
    return (
      <Register
        onSwitchToLogin={() => setAuthMode("login")}
        onAuthSuccess={handleAuthSuccess}
        addToast={addToast}
      />
    );
  }

  return (
    <Login
      onSwitchToRegister={() => setAuthMode("register")}
      onAuthSuccess={handleAuthSuccess}
      addToast={addToast}
    />
  );
}

function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ChatProvider>
      <AppContent addToast={addToast} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ChatProvider>
  );
}

export default App;
