import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createClass, getClasses, selectClassList } from "../../store/slices/Class";
import { Backdrop } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdDelete, MdLink } from "react-icons/md";
import { ClassCreate } from "../../Types/Class";
import { useAppDispatch } from "../../store/store";

interface HourSelection {
  day: number;
  hour: number;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Calendar() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const classes = useSelector(selectClassList);

  const [selectedHour, setSelectedHour] = useState<HourSelection | null>(null);
  const [newClassName, setNewClassName] = useState<string>("");
  const [newClassStartTime, setNewClassStartTime] = useState<string>("");
  const [newClassEndTime, setNewClassEndTime] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleHourClick = ({ day, hour }: HourSelection) => {
    const formattedHour = `${hour < 10 ? "0" : ""}${hour}:00`;
    const classData = classes.find(
      (c) => c.weekDay === day && c.startTime === formattedHour
    );
    if (classData) {
      setNewClassName(classData.name);
      setNewClassStartTime(classData.startTime);
      setNewClassEndTime(classData.endTime);
    } else {
      setNewClassName("");
      setNewClassStartTime(formattedHour);
      setNewClassEndTime(`${hour + 1 < 10 ? "0" : ""}${hour + 1}:00`);
    }
    setSelectedHour({ day, hour });
    setOpen(true);
  };

  const handleSaveClass = () => {
    if (selectedHour) {
      const newClass: ClassCreate = {
        name: newClassName,
        weekDay: selectedHour.day,
        startTime: newClassStartTime,
        endTime: newClassEndTime,
      };
      dispatch(createClass(newClass));
      setSelectedHour(null);
    }
  };

  const handleRemoveClass = (id: number) => {
    //
  };

  const calculateHeight = (start: string, end: string): string => {
    const startTime = parseInt(start.split(":")[0]);
    const endTime = parseInt(end.split(":")[0]);
    return `${(endTime - startTime) * 50}px`;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {daysOfWeek.map((day, index) => (
        <div key={day} className="w-full relative">
          <h3>{day}</h3>
          <div>
            {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
              <div
                key={hour}
                onClick={() => handleHourClick({ day: index, hour })}
                style={{
                  position: "relative",
                  height: "50px",
                  padding: "10px",
                }}
                className="border-b border-gray-300 cursor-pointer"
              >
                {hour}:00
                {classes
                  .filter(
                    (c) =>
                      c.weekDay === index &&
                      c.startTime.split(":")[0] === `${hour}`
                  )
                  .map((c) => (
                    <div
                      key={c.id}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: calculateHeight(c.startTime, c.endTime),
                        padding: "5px",
                      }}
                      className="flex flex-col justify-between bg-gray-200 text-xs relative text-gray-600 rounded-lg z-20 backdrop-blur-lg opacity-90"
                    >
                      <div className="w-full flex items-center justify-between">
                        <div>
                          {c.name} ({c.startTime}-{c.endTime})
                        </div>
                        <motion.div
                          className="text-2xl hover:text-red-500 cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(c.id);
                            setShowDelete(true);
                          }}
                        >
                          <MdDelete />
                        </motion.div>
                      </div>
                      <div className="flex items-center justify-end">
                        <motion.div
                          className="text-2xl"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link to={`/class/${c.id}`}>
                            <MdLink />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedHour && open && (
        <Backdrop
          open={true}
          style={{ zIndex: 100 }}
          onClick={() => {
            setOpen(false);
          }}
          className="flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-lg flex flex-col items-center justify-center space-y-5"
          >
            <div className="flex flex-col w-full">
              <input
                type="text"
                placeholder="Class Name"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="w-full p-2 rounded-lg"
              />
            </div>
            <div className="flex justify-between space-x-10">
              <div className="flex space-x-1 items-center">
                <input
                  type="time"
                  value={newClassStartTime}
                  onChange={(e) => setNewClassStartTime(e.target.value)}
                />
                <input
                  type="time"
                  value={newClassEndTime}
                  onChange={(e) => setNewClassEndTime(e.target.value)}
                />
              </div>
              <div className="flex space-x-1 items-center">
                <button
                  onClick={handleSaveClass}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
                >
                  Save
                </button>
                <button
                  onClick={() => setSelectedHour(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
      {showDelete && (
        <Backdrop
          open={true}
          style={{ zIndex: 100 }}
          onClick={() => {
            setShowDelete(false);
          }}
          className="flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-lg flex flex-col items-center justify-center space-y-5"
          >
            <div>Are you sure you want to delete this class?</div>
            <div className="flex justify-between space-x-10">
              <div className="flex space-x-1 items-center">
                <button
                  onClick={() => {
                    handleRemoveClass(deleteId!);
                    setSelectedHour(null);
                    setShowDelete(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowDelete(false);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </div>
  );
}

export default Calendar;
