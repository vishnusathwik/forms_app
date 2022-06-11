import React, { useState, useRef, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dotsIcon from "../../../assets/svg/verticalDots.svg";
import menuIcon from "../../../assets/svg/menu.svg";
import menuAltIcon from "../../../assets/svg/menuAlt.svg";
import gridIcon from "../../../assets/svg/grid.svg";
import checkIcon from "../../../assets/svg/check.svg";
import documentAddIcon from "../../../assets/svg/documentAdd.svg";
import documentRemoveIcon from "../../../assets/svg/documentRemove.svg";
import useOutsideClick from "../../../utils/useOutsideClick";
import { GlobalState } from "../../../config/contextAPI";
import { QuestionContext } from "./Question";

export const Dropdown = () => {
  const { state, dispatch } = useContext(GlobalState);
  const id = useContext(QuestionContext);

  const contentForms = state.contentForms;
  const index = contentForms.findIndex((el) => el.id === id);
  const formState = contentForms[index];

  const [isDropdown, setDropdown] = useState(false);

  const ref = useRef();
  useOutsideClick(ref, () => isDropdown && setDropdown(false));

  const changeInputType = (type) => {
    contentForms[index].inputType = type;
    contentForms[index].options = [""];
    dispatch({ type: "CHANGE_CONTENTFORM", value: [...contentForms] });
  };

  const dropdownMenu = [
    {
      icon: menuAltIcon,
      text: "Short answer",
      type: "text",
      onClick: changeInputType,
    },
    {
      icon: menuIcon,
      text: "Paragraph",
      type: "textarea",
      onClick: changeInputType,
    },
    {
      icon: gridIcon,
      text: "Multiple choice",
      type: "radio",
      onClick: changeInputType,
    },
    {
      icon: checkIcon,
      text: "Checkbox      ",
      type: "checkbox",
      onClick: changeInputType,
    },
    {
      icon:
        formState && formState.isDesc ? documentRemoveIcon : documentAddIcon,
      text:
        formState && formState.isDesc
          ? "Delete description"
          : "Add description",

      onClick: () => {
        contentForms[index].isDesc
          ? (contentForms[index].isDesc = false)
          : (contentForms[index].isDesc = true);
        dispatch({ type: "CHANGE_CONTENTFORM", value: [...contentForms] });
      },
    },
  ];

  return (
    state.isEdit && (
      <div
        ref={ref}
        onClick={() => setDropdown(!isDropdown)}
        className={`${
          isDropdown ? "bg-gray-300 z-10" : "hover:bg-gray-100"
        } absolute right-2 top-2 p-2 rounded-full duration-200 cursor-pointer `}
      >
        <img src={dotsIcon} alt="dots" className="h-6 w-6" />
        <AnimatePresence>
          {isDropdown && (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute rounded shadow right-0 top-12 bg-white w-60"
            >
              <ul className="text-gray-500 py-1">
                {dropdownMenu.map((el, index) => (
                  <li
                    key={index}
                    className={`flex items-center space-x-3 py-2 px-5 hover:bg-gray-100 `}
                    onClick={() => el.onClick(el.type)}
                  >
                    <img src={el.icon} alt="icon" className="h-5 w-5" />
                    <p>{el.text}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
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
