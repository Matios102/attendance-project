import React from "react";
import { motion } from "framer-motion";

type Props = {
  col_span: number;
  row_span: number;
  col_start: number;
  row_start: number;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

function MenuTile({
  col_span,
  row_span,
  col_start,
  row_start,
  onClick,
  disabled = false,
  children,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1.0 : 1.05 }}
      whileTap={{ scale: disabled ? 1.0 : 0.95 }}
      style={{
        gridColumnStart: col_start,
        gridColumnEnd: col_start + col_span,
        gridRowStart: row_start,
        gridRowEnd: row_start + row_span,
      }}
      className={`w-full h-full rounded-lg shadow-md bg-neutral-100 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:shadow-lg hover:bg-neutral-200"
      }`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default MenuTile;
