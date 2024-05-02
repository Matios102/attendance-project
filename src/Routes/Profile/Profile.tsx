import React from "react";
import { useSelector } from "react-redux";
import { logout, selectUser } from "../../store/slices/User";
import { User } from "../../Types/User";
import { motion } from "framer-motion";
import Page from "../../Components/Page";
import { MdEmail, MdPerson } from "react-icons/md";
import { useAppDispatch } from "../../store/store";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user: User = useSelector(selectUser);

  const [showLogout, setShowLogout] = React.useState(false);

  return (
    <Page>
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

      <div className="w-full flex justify-center">
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
          onCancel={() => {
            setShowLogout(false);
          }}
        />
      )}
    </Page>
  );
}

export default Profile;
