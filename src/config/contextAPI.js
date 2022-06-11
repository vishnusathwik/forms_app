import { createContext } from "react";

export const GlobalState = createContext();

export const initialState = {
  titleForm: { title: "", desc: "" },
  contentForms: [],
  isAnimateSubmitButton: false,
  isDark: false,
  isModal: false,
  isLogin: false,
  isLoading: false,
  isEdit: true,
  uid: "",
  inputs: [],
  idForm: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TITLEFORM":
      return {
        ...state,
        titleForm: action.value,
      };
    case "CHANGE_CONTENTFORM":
      return {
        ...state,
        contentForms: action.value,
      };
    case "CHANGE_ISANIMATESUBMITBUTTON":
      return {
        ...state,
        isAnimateSubmitButton: action.value,
      };
    case "CHANGE_ISDARK":
      return {
        ...state,
        isDark: action.value,
      };
    case "CHANGE_ISMODAL":
      return {
        ...state,
        isModal: action.value,
      };
    case "CHANGE_ISLOGIN":
      return {
        ...state,
        isLogin: action.value,
      };
    case "CHANGE_ISLOADING":
      return {
        ...state,
        isLoading: action.value,
      };
    case "CHANGE_UID":
      return {
        ...state,
        uid: action.value,
      };
    case "CHANGE_ISEDIT":
      return {
        ...state,
        isEdit: action.value,
      };
    case "CHANGE_INPUTS":
      return {
        ...state,
        inputs: action.value,
      };
    case "CHANGE_IDFORM":
      return {
        ...state,
        idForm: action.value,
      };
    default:
      return state;
  }
};
