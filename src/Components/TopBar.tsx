import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  const generateTimelineStripes = () => {
    let stripes = [];
    for (
      let minute = currentMinutes - 240;
      minute <= currentMinutes + 240;
      minute += 30
    ) {
      let position = minute - currentMinutes + 240;
      if (position >= 0 && position <= 480) {
        let minuteDifference = minute - currentMinutes;
        if (minuteDifference === 0) {
          continue;
        }
        stripes.push(
          <div
            key={minute}
            className={`flex flex-col items-center justify-center absolute top-0 w-[2px] z-10 overflow-visible`}
            style={{ left: `${position}px` }}
          >
            <span className="absolute top-0 text-[8px] mb-auto h-4">{minuteDifference}</span>
            <div className="absolute top-5 h-20 bg-neutral-400 w-[2px]"></div>
          </div>
        );
      }
    }
    return stripes;
  };

  return (
    <div className="w-full h-24 flex items-center justify-between py-10 overflow-visible">
      <div className="flex items-center space-x-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-5xl text-gray-600 cursor-pointer hover:text-gray-400 hover:drop-shadow-md"
          onClick={() => {
            navigate("/");
          }}
        >
          <MdHome />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-5xl text-gray-600 cursor-pointer hover:text-gray-400 hover:drop-shadow-md"
          onClick={() => {
            navigate(-1);
          }}
        >
          <MdArrowBack />
        </motion.div>
      </div>
      <div className="text-2xl text-gray-600 overflow-hidden w-[480px] h-20 relative flex items-end">
        {classes.map((cls) => {
          const start = formatTimeToMinutes(cls.startTime);
          const end = formatTimeToMinutes(cls.endTime);
          const leftPosition = start - currentMinutes + 240;
          const width = end - start;

          if (leftPosition + width > 0 && leftPosition < 480) {
            return (
              <motion.div
                key={cls.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="z-20 absolute mb-[3px] rounded-lg p-1 cursor-pointer bg-neutral-200 text-xs text-gray-600 flex items-center justify-center"
                style={{
                  left: `${leftPosition}px`,
                  width: `${width}px`,
                  height: "70%",
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
        <div className="flex flex-col items-center justify-center absolute top-0 left-[50%] w-[2px] z-30 overflow-visible">
          <span className="text-xs h-4">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <div className="h-20 bg-green-400 w-[2px]"></div>
        </div>
        {generateTimelineStripes()}
      </div>
    </div>
  );
}

export default TopBar;
