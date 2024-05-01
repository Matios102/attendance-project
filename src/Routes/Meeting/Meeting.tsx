import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectMeeting } from "../../store/slices/Meeting";
import { MdCalendarToday } from "react-icons/md";
import { MdOutlinePlayLesson } from "react-icons/md";

function Meeting() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const meeting = useSelector(selectMeeting);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-5xl font-semibold mb-5">
          <h2>{meeting.date}</h2>
          <MdCalendarToday />
        </div>
        <motion.button
          className="flex items-center space-x-1 text-4xl font-bold mb-5"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            navigate(`/class/${meeting.classId}`);
          }}
        >
          <MdOutlinePlayLesson />
          <div>Go to class</div>
        </motion.button>
      </div>
      <div className="flex flex-col space-y-2 divde-y">
        {meeting !== undefined &&
          meeting.studentsAttendance.map((student) => {
            return (
              <div
                key={student.id}
                className="flex items-center justify-between space-x-8 text-xl font-semibold"
              >
                <div>{student.name}</div>
                {student.present ? (
                  <span className="text-green-700">Present</span>
                ) : (
                  <span className="text-red-700">Absent</span>
                )}
              </div>
            );
          })}
      </div>
    </motion.div>
  );
}

export default Meeting;
