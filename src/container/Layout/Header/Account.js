import React, { useRef, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "../../../utils/useOutsideClick";
import { GlobalState } from "../../../config/contextAPI";
import { getDataFromDatabase } from "../../../config/firebase";

export const Account = () => {
  const { state, dispatch } = useContext(GlobalState);
  const [isDropdown, setDropdown] = useState(false);
  const [name, setName] = useState("");

  const ref = useRef();
  useOutsideClick(ref, () => setDropdown(false));

  useEffect(() => {
    const getUserData = async () =>
      await getDataFromDatabase(`users/${state.uid}`)
        .then((res) => setName(res.name))
        .catch((e) => console.log(e));
    state.uid && getUserData();
    return () => setName("");
  }, [state.uid]);

  return (
    <div
      ref={ref}
      onClick={() =>
        state.isLogin
          ? setDropdown(!isDropdown)
          : dispatch({ type: "CHANGE_ISMODAL", value: true })
      }
      className={`${
        name ? "bg-green-600" : "bg-indigo-600"
      } h-10 w-10 relative rounded-full border-2 border-gray-200 flex justify-center items-center cursor-pointer`}
    >
      <span className="text-white text-lg">{name ? name.charAt(0) : "?"}</span>
      <AnimatePresence>
        {isDropdown && (
          <motion.button
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => {
              window.location.reload();
              localStorage.clear();
            }}
            className={`absolute py-2 px-3 -left-5 top-11 border border-gray-300 bg-white rounded shadow-lg hover:bg-indigo-50 outline-none focus:outline-none text-sm`}
          >
            Logout
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const variants = {
  initial: {
    y: 50,
  },
  animate: {
    y: 0,
  },
  exit: {
    y: 50,
    transition: {
      type: "tween",
      ease: "easeIn",
      duration: 0.23,
    },
  },
};
