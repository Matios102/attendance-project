import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome, MdArrowBack } from "react-icons/md";
import { motion } from "framer-motion";

function TopBar() {
  const location = useLocation();

  return (
    <div className="w-full h-12 flex items-center p-10">
      <Link
        to="/"
        className="text-5xl text-gray-600 cursor-pointer hover:text-gray-400 hover:drop-shadow-md"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {location.pathname !== "/" ? <MdArrowBack /> : <MdHome />}
        </motion.div>
      </Link>
    </div>
  );
}

export default TopBar;
