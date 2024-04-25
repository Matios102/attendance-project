import React from "react";
import { motion } from "framer-motion";

type Props = {
  col_span?: number;
  row_span?: number;
  col_start?: number;
  row_start?: number;
  children?: React.ReactNode;
};

function MenuTile({
  col_span = 1,
  row_span = 1,
  col_start,
  row_start,
  children,
}: Props) {
  const colSpanClass = `col-span-${col_span}`;
  const rowSpanClass = `row-span-${row_span}`;
  const colStartClass = col_start ? `col-start-${col_start}` : "";
  const rowStartClass = row_start ? `row-start-${row_start}` : "";
  const baseClass =
    "w-full h-full rounded-lg shadow-md hover:shadow-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClass} ${colSpanClass} ${rowSpanClass} ${colStartClass} ${rowStartClass}`}
    >
      {children}
    </motion.div>
  );
}

export default MenuTile;
