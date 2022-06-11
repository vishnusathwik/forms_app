import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Dropdown = ({
  isDropdown,
  openForm,
  editForm,
  deleteForm,
  copyToClipboard,
  showData,
}) => {
  const dropdownMenu = [
    {
      text: "Open",
      onClick: openForm,
    },
    {
      text: "Edit",
      onClick: editForm,
    },
    {
      text: "copy link URL",
      onClick: copyToClipboard,
    },
    {
      text: "Show data",
      onClick: showData,
    },
    {
      text: "Delete",
      onClick: deleteForm,
    },
  ];
  return (
    <AnimatePresence>
      {isDropdown && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute rounded shadow right-0 lg:-right-20 lg:top-10 bg-white w-40 z-10"
        >
          <ul className="text-gray-500 py-1">
            {dropdownMenu.map((el, index) => (
              <li
                key={index}
                className="py-2 px-5 hover:bg-gray-100 block"
                onClick={() => el.onClick()}
              >
                {el.text}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const variants = {
  initial: {
    y: -50,
  },
  animate: {
    y: 0,
  },
  exit: {
    y: -150,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.23,
    },
  },
};
