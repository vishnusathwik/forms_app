import React, { useContext, useRef } from "react";
import { GlobalState } from "../../../config/contextAPI";
import moonIcon from "../../../assets/svg/moon.svg";
import sunIcon from "../../../assets/svg/sun.svg";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "../../../utils/useOutsideClick";

export const Mode = ({ setOverHide }) => {
  const { state, dispatch } = useContext(GlobalState);
  const ref = useRef();
  useOutsideClick(ref, () => setOverHide(false));
  
  return (
    <div
      ref={ref}
      className="cursor-pointer relative h-full"
      onClick={() => {
        setOverHide(true);
        dispatch({ type: "CHANGE_ISDARK", value: !state.isDark });
      }}
    >
      <img src={moonIcon} alt="light-mode" className="h-6 w-6 invisible" />
      <AnimatePresence>
        {!state.isDark && (
          <motion.img
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            src={sunIcon}
            alt="light-mode"
            className="h-6 w-6 absolute top-0"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {state.isDark && (
          <motion.img
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            src={moonIcon}
            alt="dark-mode"
            className="h-6 w-6 absolute top-0"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const variants = {
  initial: { y: 100 },
  animate: { y: 0, transition: { delay: 0.23 } },
  exit: { y: 100 },
};
