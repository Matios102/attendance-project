import React from "react";
import { motion } from "framer-motion";

type Props = {
  col_span?: number;
  row_span?: number;
  children?: React.ReactNode;
};

function MenuTile({ col_span = 1, row_span = 1, children }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full h-full rounded-lg p-2 shadow-md hover:shadow-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer col-span-${col_span} row-span-${row_span}`}
    >
      {children}
    </motion.div>
  );
}

export default MenuTile;
