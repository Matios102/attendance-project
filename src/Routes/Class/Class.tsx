import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SiGoogleclassroom } from "react-icons/si";
import { MdAdd, MdDelete, MdList, MdTimer } from "react-icons/md";
import { Backdrop } from "@mui/material";
import { FaRegSadCry } from "react-icons/fa";
import { useAppDispatch } from "../../store/store";
import {
  getClassById,
  selectCurrentClass,
  selectGetClassesError,
  selectGetCurrentClassStatus,
} from "../../store/slices/Class";
import Page from "../../Components/Page";
import StatusInfo from "../../Components/StatusInfo";
import {
  addStudentToClass,
  getStudentsBySearchTerm,
  removeStudentFromClass,
  resetAddStudentToClassStatus,
  resetRemoveStudentFromClassStatus,
  selectAddStudentToClassStatus,
  selectGetStudentsBySearchTermError,
  selectGetStudentsBySearchTermStatus,
  selectRemoveStudentFromClassStatus,
  selectStudents,
} from "../../store/slices/Student";
import {
  getMeetingsForClass,
  selectMeetingsForClass,
} from "../../store/slices/Meeting";

function ClassComponent() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [studentGetSearchTerm, setStudentGetSearchTerm] = useState("");

  const addStudentToClassStatus = useSelector(selectAddStudentToClassStatus);
  const removeStudentFromClassStatus = useSelector(
    selectRemoveStudentFromClassStatus
  );

  useEffect(() => {
    if (id) {
      dispatch(getClassById(parseInt(id)));
      dispatch(getMeetingsForClass(parseInt(id)));
    } else {
      navigate("/my-classes");
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (id !== null && id !== undefined) {
      if (addStudentToClassStatus === "succeeded") {
        dispatch(resetAddStudentToClassStatus());
        dispatch(getClassById(parseInt(id)));
      }
      if (removeStudentFromClassStatus === "succeeded") {
        dispatch(resetRemoveStudentFromClassStatus());
        dispatch(getClassById(parseInt(id)));
      }
    }
  });

  const studentsSearch = useSelector(selectStudents);
  const getStudentsBySearchTermStatus = useSelector(
    selectGetStudentsBySearchTermStatus
  );
  const getStudentsBySearchTermError = useSelector(
    selectGetStudentsBySearchTermError
  );

  const currentClass = useSelector(selectCurrentClass);
  const getCurrentClassSatuts = useSelector(selectGetCurrentClassStatus);
  const getCurrentClassError = useSelector(selectGetClassesError);
  const meetingsForClass = useSelector(selectMeetingsForClass);

  const [description, setDescription] = useState(
    currentClass?.description ? currentClass.description : ""
  );
  const [inDesciprionEdit, setInDescriptionEdit] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showDeleteStudent, setShowDeleteStudent] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState<number | null>(
    null
  );

  if (currentClass === null) {
    return (
      <Page>
        <StatusInfo
          status={getCurrentClassSatuts}
          error={getCurrentClassError}
        />
      </Page>
    );
  }

  console.log(currentClass, meetingsForClass)

  return (
    <Page>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-5xl font-semibold mb-5">
          <h2>{currentClass.name}</h2>
          <SiGoogleclassroom />
        </div>
        <div className="flex items-center space-x-1 text-6xl font-bold mb-5">
          <MdTimer />
          <div>
            {currentClass.start_time}-{currentClass.end_time}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-3">
        <h3 className="text-3xl font-semibold">Class Description: </h3>
        <textarea
          className={
            `w-full p-2 border-2 rounded-md ` +
            (inDesciprionEdit ? " text-black" : " text-neutral-500")
          }
          placeholder="Add class description"
          value={description}
          onClick={() => {
            setInDescriptionEdit(true);
          }}
          onChange={() => {
            setDescription(description);
          }}
        />
        {inDesciprionEdit && (
          <div className="w-full flex items-center space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
              onClick={() => {
                setInDescriptionEdit(false);
              }}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
              onClick={() => {
                setDescription(currentClass.description);
                setInDescriptionEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="w-full flex items-start space-x-5 divide-x-2 my-10">
        <div className="w-full p-2">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-2xl font-semibold mb-5">Students list</h4>
            <motion.button
              className="text-3xl"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setShowAddStudent(true);
              }}
            >
              <MdAdd />
            </motion.button>
          </div>
          <div className="flex flex-col space-y-3 divide-y">
            {currentClass.students.length === 0 && (
              <div className="w-full text-center text-3xl font-semibold flex items-center space-x-2">
                <FaRegSadCry />
                <span>No students in this class</span>
              </div>
            )}
            {currentClass.students.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div>{student.name}</div>
                  <div>{student.email}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span>{student.present_n_times}</span>
                    <span>/</span>
                    <span>{currentClass.n_of_meetings}</span>
                    <span>
                      (
                      {currentClass.n_of_meetings !== 0
                        ? (
                            (student.present_n_times /
                              currentClass.n_of_meetings) *
                            100
                          ).toFixed(2)
                        : 0}
                      %)
                    </span>
                  </div>
                  <motion.div
                    className="text-2xl hover:text-red-500 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStudentIdToDelete(student.id);
                      setShowDeleteStudent(true);
                    }}
                  >
                    <MdDelete />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full p-2">
          <h4 className="text-2xl font-semibold mb-5">Meeting history</h4>
          <div className="flex flex-col space-y-2">
            {meetingsForClass !== undefined &&
              meetingsForClass.length === 0 && (
                <div className="w-full text-center text-3xl font-semibold flex items-center space-x-2">
                  <FaRegSadCry />
                  <span>No meeting history</span>
                </div>
              )}
            {meetingsForClass !== undefined &&
              meetingsForClass.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between relative p-2 border-2 rounded-lg overflow-hidden"
                >
                  {meeting.cancelled && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-neutral-300 bg-opacity-70 cursor-not-allowed">
                      <span className="text-white font-bold text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        Cancelled
                      </span>
                    </div>
                  )}
                  {new Date(meeting.end_date) < new Date() && (
                    <div className="bg-red-500 text-white p-1 rounded-lg">
                      Past meeting
                    </div>
                  )}
                  {new Date(meeting.start_date) > new Date() && (
                    <div className="bg-yellow-500 text-white p-1 rounded-lg">
                      Upcoming meeting
                    </div>
                  )}
                  {new Date(meeting.start_date) <= new Date() &&
                    new Date(meeting.end_date) >= new Date() && (
                      <div className="bg-green-500 text-white p-1 rounded-lg">
                        Current meeting
                      </div>
                    )}
                  <div>
                    <span className="text-2xl font-semibold">
                      Meeting date:
                    </span>{" "}
                    <span className="text-xl">{new Date(meeting.start_date).toDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="text-2xl hover:text-fuchsia-500 cursor-pointer flex space-x-1 items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (meeting.cancelled) return;
                        navigate(`/meeting/${meeting.id}`);
                      }}
                    >
                      <span className="text-sm font-semibold">Attendance</span>
                      <MdList />
                    </motion.div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showAddStudent && (
        <Backdrop
          open={true}
          style={{ zIndex: 100 }}
          onClick={() => {
            setShowAddStudent(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-lg flex flex-col items-center justify-center space-y-5"
          >
            <div className="flex flex-col justify-center items-center space-y-2">
              <form
                className="w-full flex items-center justify-between space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(getStudentsBySearchTerm(studentGetSearchTerm));
                }}
              >
                <input
                  type="text"
                  placeholder="Search by Name or Id"
                  className="w-full p-2 rounded-lg"
                  value={studentGetSearchTerm}
                  onChange={(e) => {
                    setStudentGetSearchTerm(e.target.value);
                  }}
                />
                <button
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
                  type="submit"
                >
                  Search
                </button>
              </form>

              <StatusInfo
                status={getStudentsBySearchTermStatus}
                error={getStudentsBySearchTermError}
              />
              <div className="flex items-center justify-center w-full spacey-1 flex-col">
                {studentsSearch.length === 0 && (
                  <div className="w-full text-center text-3xl font-semibold flex items-center space-x-2">
                    <FaRegSadCry />
                    <span>No students found</span>
                  </div>
                )}
                {studentsSearch.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between w-full"
                  >
                    <div>{student.name}</div>
                    <div>{student.email}</div>
                    <motion.button
                      className="text-2xl hover:text-green-500 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        dispatch(
                          addStudentToClass({
                            studentId: student.id,
                            classId: currentClass.id,
                          })
                        );
                      }}
                    >
                      <MdAdd />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
      {showDeleteStudent && (
        <Backdrop
          open={true}
          style={{ zIndex: 100 }}
          onClick={() => {
            setShowDeleteStudent(false);
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
              Are you sure you want to delete this student from the list?
            </div>
            <div className="flex justify-between space-x-10">
              <div className="flex space-x-1 items-center">
                <button
                  onClick={() => {
                    dispatch(
                      removeStudentFromClass({
                        studentId: studentIdToDelete!,
                        classId: currentClass.id,
                      })
                    );
                    setShowDeleteStudent(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowDeleteStudent(false);
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
    </Page>
  );
}

export default ClassComponent;
