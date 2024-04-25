import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home/Home";

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
