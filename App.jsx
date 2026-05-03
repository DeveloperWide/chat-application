import React, { useState, useEffect } from "react";
import { ChatProvider } from "./context/ChatContext";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Chat } from "./pages/Chat";
import "./styles/globals.css";

function AppContent() {
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
    return <Chat onLogout={() => setIsAuthenticated(false)} />;
  }

  if (authMode === "register") {
    return <Register onSwitchToLogin={() => setAuthMode("login")} />;
  }

  return <Login onSwitchToRegister={() => setAuthMode("register")} />;
}

function App() {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
}

export default App;
