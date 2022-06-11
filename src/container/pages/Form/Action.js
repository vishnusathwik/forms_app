import React, { useContext } from "react";
import duplicateIcon from "../../../assets/svg/duplicate.svg";
import trashIcon from "../../../assets/svg/trash.svg";
import plusCircleIcon from "../../../assets/svg/plusCircle.svg";
import { motion } from "framer-motion";
import { GlobalState } from "../../../config/contextAPI";
import { QuestionContext } from "./Question";

export const Action = ({ duplicate }) => {
  const { state, dispatch } = useContext(GlobalState);
  const id = useContext(QuestionContext);
  const contentForms = state.contentForms;
  const index = state.contentForms.findIndex((el) => el.id === id);

  const createForm = () => {
    const newForm = {
      id: Date.now(),
      title: "",
      isDesc: false,
      desc: "",
      options: [],
      inputType: "text",
    };
    contentForms.splice(index + 1, 0, { ...newForm });
    dispatch({ type: "CHANGE_CONTENTFORM", value: [...contentForms] });
  };

  const deleteForm = () => {
    contentForms.splice(index, 1);
    dispatch({ type: "CHANGE_CONTENTFORM", value: [...contentForms] });
    contentForms.length === index && animateSubmitButton();
  };

  const animateSubmitButton = () => {
    dispatch({ type: "CHANGE_ISANIMATESUBMITBUTTON", value: true });
    setTimeout(() => {
      dispatch({ type: "CHANGE_ISANIMATESUBMITBUTTON", value: false });
    }, 300);
  };

  const icons = [
    {
      icon: duplicateIcon,
      alt: "duplicate",
      onClick: duplicate,
      x: 112,
    },
    {
      icon: plusCircleIcon,
      alt: "plus",
      onClick: createForm,
      x: 76,
    },
    {
      icon: trashIcon,
      alt: "remove",
      onClick: deleteForm,
      x: 40,
    },
  ];

  return (
    state.isEdit && (
      <div className="border-t py-3 flex justify-end items-center space-x-3">
        {icons.map((el, idx) => (
          <span key={idx}>
            <motion.img
              initial={{
                rotate: 360,
                x: el.x,
                opacity: 0,
              }}
              animate={{ rotate: 0, x: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                duration: 0.5,
                stiffness: 80,
              }}
              src={el.icon}
              alt={el.alt}
              className="h-6 w-6 cursor-pointer"
              onClick={() => el.onClick()}
            />
          </span>
        ))}
      </div>
    )
  );
};
