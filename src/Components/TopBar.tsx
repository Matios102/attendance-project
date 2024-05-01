import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdHome, MdArrowBack } from "react-icons/md";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectClassList } from "../store/slices/Class";

function TopBar() {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const currentMinutes = formatTimeToMinutes(
    currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const classes = useSelector(selectClassList);

  return (
    <div className="w-full h-12 flex items-center justify-between p-10">
      <Link
        to="/"
        className="text-5xl text-gray-600 cursor-pointer hover:text-gray-400 hover:drop-shadow-md"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {location.pathname !== "/" ? <MdArrowBack /> : <MdHome />}
        </motion.div>
      </Link>
      <div className="text-2xl text-gray-600 flex items-center space-x-2">
        <div className="text-right">{currentTime.toLocaleTimeString()}</div>
        <div className="overflow-hidden w-[90px] h-16 relative flex items-center">
          {classes.map((cls) => {
            const start = formatTimeToMinutes(cls.startTime);
            const end = formatTimeToMinutes(cls.endTime);
            const leftPosition = start - currentMinutes + 45;
            const width = end - start;

            if (leftPosition + width > 0 && leftPosition < 90) {
              return (
                <motion.div
                  key={cls.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute rounded-lg p-1 cursor-pointer bg-neutral-200 text-xs text-gray-600 flex items-center justify-center"
                  style={{
                    left: `${leftPosition}px`,
                    width: `${width}px`,
                    height: "90%",
                  }}
                  onClick={() => {
                    navigate(`/class/${cls.id}`);
                  }}
                >
                  <div>{cls.name}</div>
                </motion.div>
              );
            }
            return null;
          })}
          <div className="absolute top-0 left-[50%] w-[2px] h-full bg-green-400"></div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
