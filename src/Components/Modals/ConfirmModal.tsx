import { Backdrop } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({ text, onConfirm, onCancel }: Props) {
  return (
    <Backdrop
      open={true}
      style={{ zIndex: 100 }}
      onClick={() => {
        onCancel();
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-4 rounded-lg flex flex-col items-center justify-center space-y-5"
      >
        <div>{text}</div>
        <div className="flex justify-between space-x-10">
          <div className="flex space-x-1 items-center">
            <button
              onClick={() => {
                onConfirm();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
            >
              Yes
            </button>
            <button
              onClick={() => {
                onCancel();
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-60"
            >
              No
            </button>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export default ConfirmModal;
