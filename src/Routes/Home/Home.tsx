import React from "react";
import MenuTile from "../../Components/MenuTile";
import MainCam from "../../Features/MainCam/MainCam";
import { MdLogin, MdAdd, MdPerson } from "react-icons/md";
import { RiOpenaiFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/slices/User";

function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  return (
    <motion.div
      className="grid grid-cols-7 grid-rows-5 gap-6 h-[85vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MenuTile
        col_span={2}
        row_span={2}
        col_start={1}
        row_start={1}
      ></MenuTile>
      <MenuTile
        col_span={3}
        row_span={1}
        col_start={3}
        row_start={1}
      ></MenuTile>
      <MenuTile
        col_span={2}
        row_span={1}
        col_start={6}
        row_start={1}
        onClick={() => {
          isLoggedIn ? navigate("/profile") : navigate("/login");
        }}
      >
        <div className="flex items-center justify-center w-full h-full text-5xl text-gray-600">
          {isLoggedIn ? (
            <MdPerson />
          ) : (
            <div className="flex">
              <MdLogin />
              <MdAdd />
            </div>
          )}
        </div>
      </MenuTile>
      <MenuTile col_span={4} row_span={3} col_start={3} row_start={2}>
        <MainCam />
      </MenuTile>
      <MenuTile
        col_span={1}
        row_span={3}
        col_start={7}
        row_start={2}
        disabled={!isLoggedIn}
        onClick={() => {
          if (!isLoggedIn) return;
          navigate("/chat");
        }}
      >
        <div className="flex items-center justify-center w-full h-full text-5xl text-gray-600">
          <RiOpenaiFill />
        </div>
      </MenuTile>
      <MenuTile
        col_span={2}
        row_span={3}
        col_start={1}
        row_start={3}
      ></MenuTile>
      <MenuTile
        col_span={5}
        row_span={1}
        col_start={3}
        row_start={5}
      ></MenuTile>
    </motion.div>
  );
}

export default Home;
