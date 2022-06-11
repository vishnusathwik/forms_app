import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../config/contextAPI";
import {
  setDataToDatabase,
  signInToDatabase,
  signUpToDatabase,
} from "../../../config/firebase";

export const LoginForm = ({ isSignUp, setSignUp }) => {
  const { dispatch } = useContext(GlobalState);
  const [input, setInput] = useState({ remember: false });

  const signUp = async () => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    const data = {
      name: input.name,
      email: input.email,
      password: input.password,
    };
    try {
      const res = await signUpToDatabase(input.email, input.password);
      await setDataToDatabase(`users/${res.uid}`, data);
      alert("successful registration");
      setSignUp(false);
    } catch (error) {
      alert("sign up error\n" + error.message + "\ncode : " + error.code);
    } finally {
      dispatch({ type: "CHANGE_ISLOADING", value: false });
    }
  };

  const signIn = async () => {
    dispatch({ type: "CHANGE_ISLOADING", value: true });
    await signInToDatabase(input.email, input.password)
      .then((res) => {
        localStorage.setItem("uid", JSON.stringify(res.uid));
        dispatch({ type: "CHANGE_ISMODAL", value: false });
        dispatch({ type: "CHANGE_UID", value: res.uid });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
      })
      .catch((error) =>
        alert("login error\n" + error.message + "\ncode : " + error.code)
      )
      .finally(() => dispatch({ type: "CHANGE_ISLOADING", value: false }));
  };

  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // sign up
      if (input.name && input.email && input.password && input["re-password"]) {
        // field isn't empty
        if (input.password === input["re-password"]) {
          // password match
          signUp();
        } else {
          // password isnt match
          alert("password doesn't match");
        }
      } else {
        // some field is empty
        alert("cannot be empty");
      }
    } else {
      // sign in
      if (input.email && input.password) {
        // field isn't empty
        signIn();
      } else {
        // some field is empty
        alert("cannot be empty");
      }
    }
  };

  useEffect(() => {
    return () => setInput({ remember: false });
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="py-6 px-6">
        <div className="text-gray-600 text-sm space-y-4">
          {(!isSignUp ? login : register).map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <label htmlFor={`modal-${item.id}`} className="font-semibold">
                {item.label}
              </label>
              <input
                onChange={(e) => handleChange(e)}
                value={input[item.id] ? input[item.id] : ""}
                id={`modal-${item.id}`}
                name={item.id}
                type={item.type}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:shadow-red rounded-md duration-300 text-sm"
              />
            </div>
          ))}
          {!isSignUp && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  onChange={(e) =>
                    setInput({ ...input, remember: e.target.checked })
                  }
                  id="modal-remember"
                  name="remember"
                  type="checkbox"
                  className="border-gray-300 border"
                />
                <label htmlFor="modal-remember">Remember me</label>
              </div>
              <button type="button" className="text-red-400 hover:text-red-500">
              Forgot the password?
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="py-3 px-6">
        <button
          type="submit"
          className="w-full mb-3 py-2 rounded shadow-red bg-red-400 hover:bg-red-500 text-white text-center focus:outline-none outline-none tracking-widest duration-200"
        >
          {isSignUp ? "REGISTER" : "LOGIN"}
        </button>
      </div>
    </form>
  );
};

const login = [
  {
    label: "Email address",
    id: "email",
    type: "text",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
  },
];
const register = [
  {
    label: "Full name",
    id: "name",
    type: "text",
  },
  {
    label: "Email address",
    id: "email",
    type: "text",
  },
  {
    label: "Password",
    id: "password",
    type: "password",
  },
  {
    label: "Reenter password",
    id: "re-password",
    type: "password",
  },
];
