import { motion } from "framer-motion";
import React from "react";
import { ImDatabase } from "react-icons/im";

function Data() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-5xl font-semibold mb-5">
          <h2>Information about our data</h2>
          <ImDatabase />
        </div>
      </div>
    </motion.div>
  );
}

export default Data;
