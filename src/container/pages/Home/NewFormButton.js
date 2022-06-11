import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import plusIcon from "../../../assets/svg/plus.svg";
import pencilIcon from "../../../assets/svg/pencil.svg";
import { GlobalState } from "../../../config/contextAPI";

export const NewFormButton = () => {
  const { state, dispatch } = useContext(GlobalState);
  const [isHover, setHover] = useState(false);
  const { push } = useHistory();

  const handleClick = () => {
    const id = Date.now();
    state.isLogin
      ? push(`edit/uid=${state.uid}&&id=${id}/`)
      : dispatch({ type: "CHANGE_ISMODAL", value: true });
  };
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100, transition: { ease: "easeInOut" } }}
      transition={{ type: "spring", stiffness: 150 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleClick()}
      className="absolute h-16 w-16 bottom-8 right-8 rounded-full shadow-md bg-white"
    >
      <div className="h-full w-full absolute left-0 top-0 flex items-center justify-center cursor-pointer">
        <img
          src={plusIcon}
          alt="+"
          className={`${
            !isHover
              ? "rotate-0 translate-y-0 opacity-100 delay-100"
              : "rotate-45 opacity-20 invisible"
          } transform duration-100 h-10 w-10`}
        />
      </div>
      <div className="h-full w-full absolute left-0 top-0 flex items-center justify-center cursor-pointer">
        <img
          src={pencilIcon}
          alt="+"
          className={`${
            isHover
              ? "rotate-0 translate-y-0 opacity-100 delay-100"
              : "-rotate-45 opacity-20 invisible"
          } transform duration-100 h-7 w-7`}
        />
      </div>
    </motion.div>
  );
};
