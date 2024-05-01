import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home/Home";
import LoginPage from "./Routes/Login/LoginPage";
import Chat from "./Routes/Chat/Chat";
import TopBar from "./Components/TopBar";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./store/slices/User";
import MyClasses from "./Routes/MyClasses/MyClasses";
import Class from "./Routes/Class/Class";
import Meeting from "./Routes/Meeting/Meeting";
import Data from "./Routes/Data/Data";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="p-4">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLoggedIn
          ? [
              <Route path="/profile" element={<div>Profile</div>} />,
              <Route path="/chat" element={<Chat />} />,
              <Route path="/my-classes" element={<MyClasses />} />,
              <Route path="/class/:id" element={<Class />} />,
              <Route path="/meeting/:id" element={<Meeting />} />,
            ]
          : null}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/data" element={<Data />} />
        <Route path="*" element={<Navigate replace={true} to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
