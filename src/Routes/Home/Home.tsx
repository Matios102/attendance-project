import React, { useEffect } from "react";
import MenuTile from "../../Components/MenuTile";
import MainCam from "../../Features/MainCam/MainCam";
import { MdLogin, MdAdd, MdPerson, MdList } from "react-icons/md";
import { RiOpenaiFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/slices/User";
import { SiGoogleclassroom } from "react-icons/si";
import { ImDatabase } from "react-icons/im";
import {
  getCurrentMeeting,
  selectCurrentMeeting,
} from "../../store/slices/Meeting";
import { useAppDispatch } from "../../store/store";

function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {    
      dispatch(getCurrentMeeting());    
  }, [dispatch]);

  const currentMeeting = useSelector(selectCurrentMeeting);

  const navigateIfLoggedIn = (path: string): void => {
    if (!isLoggedIn) {
      return;
    } else {
      navigate(path);
    }
  };

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
        onClick={() => {
          navigateIfLoggedIn("/my-classes");
        }}
        disabled={!isLoggedIn}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-5xl text-gray-600">
          <SiGoogleclassroom />
          <span className="text-2xl font-semibold">CLASSES</span>
        </div>
      </MenuTile>
      <MenuTile
        col_span={5}
        row_span={1}
        col_start={3}
        row_start={1}
        onClick={() => {
          isLoggedIn ? navigate("/profile") : navigate("/login");
        }}
      >
        <div className="flex items-center justify-center w-full h-full text-5xl text-gray-600">
          {isLoggedIn ? (
            <div className="flex flex-col items-center">
              <MdPerson />
              <span className="text-2xl font-semibold">PROFILE</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex">
                <MdLogin />
                <MdAdd />
              </div>
              <span className="text-2xl font-semibold">LOGIN</span>
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
          navigateIfLoggedIn("/chat");
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-5xl text-gray-600">
          <RiOpenaiFill />
          <span className="text-2xl font-semibold">ChatGPT</span>
        </div>
      </MenuTile>
      <MenuTile
        col_span={2}
        row_span={3}
        col_start={1}
        row_start={3}
        disabled={!isLoggedIn || !currentMeeting}
        onClick={() => {
          if (currentMeeting) {
            navigateIfLoggedIn(`/meeting/${currentMeeting.id}`);
          }
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-5xl text-gray-600">
          <MdList />
          <span className="text-2xl font-semibold">ATTENDANCE</span>
        </div>
      </MenuTile>
      <MenuTile
        col_span={5}
        row_span={1}
        col_start={3}
        row_start={5}
        onClick={() => {
          navigate("/data");
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-5xl text-gray-600">
          <ImDatabase />
          <span className="text-2xl font-semibold">DATA</span>
        </div>
      </MenuTile>
    </motion.div>
  );
}

export default Home;
