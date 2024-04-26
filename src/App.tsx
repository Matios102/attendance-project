import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home/Home";
import LoginPage from "./Routes/Login/LoginPage";
import Chat from "./Routes/Chat/Chat";

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
