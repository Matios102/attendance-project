import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  cancelMeeting,
  getMeetingById,
  selectMeeting,
  selectMeetingStatus,
} from "../../store/slices/Meeting";
import { MdCalendarToday, MdCancel } from "react-icons/md";
import { MdOutlinePlayLesson } from "react-icons/md";
import { useAppDispatch } from "../../store/store";
import StatusInfo from "../../Components/StatusInfo";
import { AxiosError } from "axios";
import Backdrop from "@mui/material/Backdrop/Backdrop";

function Meeting() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMeetingById(parseInt(id!)));
  }, [dispatch, id]);

  const navigate = useNavigate();
  const meeting = useSelector(selectMeeting);
  const meetingStatus = useSelector(selectMeetingStatus);

  const [showCancelModal, setShowCancelModal] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StatusInfo
        status={meetingStatus}
        error={new AxiosError("Error loading meeting. Please try again later.")}
      />
      {meeting !== null && (
        <div>
          {meeting.cancelled && (
            <Backdrop
              open={true}
              style={{ zIndex: 100 }}
              className="text-4xl text-white flex items-center justify-center"
            >
              <MdCancel />
              <span>This meeting has been cancelled.</span>
            </Backdrop>
          )}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1 text-5xl font-semibold mb-5">
                <h2>{new Date(meeting.start_date).toDateString()}</h2>
                <MdCalendarToday />
              </div>
              <motion.button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Meeting
              </motion.button>
            </div>
            <motion.button
              className="flex items-center space-x-1 text-4xl font-bold mb-5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/class/${meeting.class_id}`)}
            >
              <MdOutlinePlayLesson />
              <div>Go to class</div>
            </motion.button>
          </div>
          <div className="flex flex-col space-y-2 divide-y divide-gray-300">
            {meeting.students.length > 0 ? (
              meeting.students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between space-x-8 py-2 text-xl font-semibold"
                >
                  <div>{student.name}</div>
                  <div>{student.email}</div>
                  <span
                    className={
                      student.attendance.presence
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  >
                    {student.attendance.presence ? "Present" : "Absent"}
                  </span>
                  {student.attendance.arrival_time && (
                    <span className="text-gray-500">
                      {new Date(
                        student.attendance.arrival_time
                      ).toLocaleTimeString()}
                    </span>
                  )}
                  {student.attendance.presence &&
                    student.attendance.arrival_time && (
                      <span
                        className={
                          student.attendance.was_late
                            ? "text-yellow-600"
                            : "text-gray-500"
                        }
                      >
                        {student.attendance.was_late ? "Late" : "On time"}
                      </span>
                    )}
                </div>
              ))
            ) : (
              <p className="text-xl text-gray-500 py-2">
                No students in this meeting.
              </p>
            )}
          </div>
        </div>
      )}
      {showCancelModal && (
        <Backdrop
          open={true}
          style={{ zIndex: 100 }}
          onClick={() => {
            setShowCancelModal(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-lg flex flex-col items-center justify-center space-y-5"
          >
            <div>
              Are you sure you want to cancel this meeting? This change is
              irreversible.
            </div>
            <div className="flex justify-between space-x-10">
              <div className="flex space-x-1 items-center">
                <button
                  onClick={() => {
                    dispatch(cancelMeeting(parseInt(id!)));
                    setShowCancelModal(false);
                    navigate(`/class/${meeting.class_id}`);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowCancelModal(false);
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
    </motion.div>
  );
}

export default Meeting;
