import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Page from "../../Components/Page";
import { MdEmail, MdPerson, MdAddAPhoto } from "react-icons/md";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { User } from "../../Types/User";
import { selectUser, logout } from "../../store/slices/User";
import {
  createStudent,
  resetCreateStudentStatus,
  selectCreateStudentStatus,
} from "../../store/slices/Student";
import StatusInfo from "../../Components/StatusInfo";

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user: User = useSelector(selectUser);

  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [studentPictures, setStudentPictures] = useState<File[]>([]);

  const studentCreateStatus = useSelector(selectCreateStudentStatus);

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setStudentPictures(Array.from(event.target.files));
    }
  };

  useEffect(() => {
    if (studentCreateStatus === "succeeded") {
      setStudentName("");
      setStudentEmail("");
      setStudentPictures([]);
      dispatch(resetCreateStudentStatus());
    }
  }, [dispatch, studentCreateStatus]);

  const submitStudent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", studentName);
    formData.append("email", studentEmail);
    studentPictures.forEach((file, index) =>
      formData.append(`picture${index + 1}`, file)
    );

    dispatch(
      createStudent({
        name: studentName,
        email: studentEmail,
        pictures: studentPictures,
      })
    );
  };

  return (
    <Page>
      <StatusInfo status={studentCreateStatus} error={null} />
      <div className="w-full flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1 text-5xl font-semibold mb-3">
            <h2>Hi, {user.name}</h2>
            <MdPerson />
          </div>
          <div className="flex items-center space-x-1 text-4xl font-semibold mb-5">
            <div>{user.email}</div>
            <MdEmail />
          </div>
        </div>
        <div className="text-lg space-y-2 flex flex-col items-end">
          <span>Created: {new Date(user.created_at).toLocaleDateString()}</span>
          <span>Updated: {new Date(user.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="w-full flex justify-center mt-5">
        <form
          className="w-full bg-neutral-100 p-5 rounded-lg shadow-md"
          onSubmit={submitStudent}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MdPerson className="text-2xl" />
              <input
                type="text"
                placeholder="Student Name"
                className="w-full p-2 rounded border"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <MdEmail className="text-2xl" />
              <input
                type="email"
                placeholder="Student Email"
                className="w-full p-2 rounded border"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <MdAddAPhoto className="text-2xl" />
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full p-2"
                onChange={handlePictureChange}
                required
              />
            </div>
          </div>
          <motion.button
            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            Add Student
          </motion.button>
        </form>
      </div>

      <div className="w-full flex justify-center my-12">
        <motion.button
          className="bg-neutral-300 w-[90%] text-xl font-semibold p-2 hover:first-line:text-white rounded-lg shadow-sm hover:shadow-md hover:bg-red-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setShowLogout(true);
          }}
        >
          Logout
        </motion.button>
      </div>
      {showLogout && (
        <ConfirmModal
          text="Are you sure you want to logout?"
          onConfirm={() => {
            dispatch(logout());
            navigate("/");
          }}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </Page>
  );
};

export default Profile;
