import { motion } from "framer-motion";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

function Page({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default Page;
