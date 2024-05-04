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
  getStudentsBySearchTerm,
  selectGetStudentsBySearchTermError,
  selectGetStudentsBySearchTermStatus,
  selectStudents,
} from "../../store/slices/Student";

function ClassComponent() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [studentGetSearchTerm, setStudentGetSearchTerm] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getClassById(parseInt(id)));
    } else {
      navigate("/my-classes");
    }
  }, [dispatch, id, navigate]);

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

  const [description, setDescription] = useState(
    currentClass?.description ? currentClass.description : ""
  );
  const [inDesciprionEdit, setInDescriptionEdit] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showDeleteStudent, setShowDeleteStudent] = useState(false);

  console.log(currentClass);

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
            {/* {tempMeetingHistory.length === 0 && (
              <div className="w-full text-center text-3xl font-semibold flex items-center space-x-2">
                <FaRegSadCry />
                <span>No meeting history</span>
              </div>
            )}
            {tempMeetingHistory.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between"
              >
                <div>{meeting.date}</div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="text-2xl hover:text-fuchsia-500 cursor-pointer flex space-x-1 items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      navigate(`/meeting/${meeting.id}`);
                    }}
                  >
                    <span className="text-sm font-semibold">Attendance</span>
                    <MdList />
                  </motion.div>
                </div>
              </div>
            ))} */}
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
              <div className="w-full flex items-center justify-between space-x-2">
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
                  onClick={() => {
                    dispatch(getStudentsBySearchTerm(studentGetSearchTerm));
                  }}
                >
                  Search
                </button>
              </div>
              <StatusInfo
                status={getStudentsBySearchTermStatus}
                error={getStudentsBySearchTermError}
              />
              <div className="flex items-center justify-center w-full spacey-1 flex-col">
                {studentsSearch.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center space-x-2">
                      <div>{student.name}</div>
                      <div>{student.email}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="text-2xl hover:text-green-500 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MdAdd />
                      </motion.div>
                    </div>
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
