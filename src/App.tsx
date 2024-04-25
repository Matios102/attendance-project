import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home/Home";
import LoginPage from "./Routes/Login/LoginPage";

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
