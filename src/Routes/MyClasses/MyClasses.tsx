import { motion } from "framer-motion";
import React from "react";
import Calendar from "../../Features/Calendar/Calendar";
import { MdCalendarMonth } from "react-icons/md";

function MyClasses() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center space-x-1 text-5xl font-semibold mb-5">
        <h2>Your calendar</h2>
        <MdCalendarMonth />
      </div>
      <Calendar />
    </motion.div>
  );
}

export default MyClasses;
