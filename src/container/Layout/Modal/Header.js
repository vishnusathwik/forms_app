import React from "react";
import userIcon from "../../../assets/svg/user.svg";
import editIcon from "../../../assets/svg/edit.svg";

export const Header = ({ isSignUp, setSignUp, dispatch }) => {
  return (
    <div className="flex justify-between items-center px-6 bg-gray-100">
      <ul className="flex space-x-8 pt-3">
        <li>
          <div
            onClick={() => setSignUp(false)}
            className={`${
              !isSignUp
                ? "text-red-400 border-b border-red-500"
                : "text-gray-600 hover:text-red-300 duration-300"
            } flex items-center space-x-2 font-semibold py-3 cursor-pointer`}
          >
            <img src={userIcon} alt="login" className="h-7 w-7" />
            <p>Sign In</p>
          </div>
        </li>
        <li>
          <div
            onClick={() => setSignUp(true)}
            className={`${
              isSignUp
                ? "text-red-400 border-b border-red-500"
                : "text-gray-600 hover:text-red-300 duration-300"
            } flex items-center space-x-2 font-semibold py-3 cursor-pointer`}
          >
            <img src={editIcon} alt="register" className="h-7 w-7" />
            <p>Sign Up</p>
          </div>
        </li>
      </ul>
      {/* x icon */}
      <div
        onClick={() =>
          dispatch({
            type: "CHANGE_ISMODAL",
            value: false,
          })
        }
        className="cursor-pointer z-50"
      >
        <svg
          className="fill-current text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </div>
    </div>
  );
};
