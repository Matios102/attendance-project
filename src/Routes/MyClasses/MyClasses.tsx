import { motion } from "framer-motion";
import React from "react";

function MyClasses() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      MyClasses
    </motion.div>
  );
}

export default MyClasses;
