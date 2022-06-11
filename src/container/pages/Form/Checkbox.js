import { useContext, useState } from "react";
import { GlobalState } from "../../../config/contextAPI";
import { QuestionContext } from "./Question";
import plusIcon from "../../../assets/svg/plus.svg";

export const Checkbox = () => {
  const id = useContext(QuestionContext);
  const { state, dispatch } = useContext(GlobalState);

  const contentForms = state.contentForms;
  const index = contentForms.findIndex((el) => el.id === id);
  const options = contentForms[index] && contentForms[index].options;

  const saveData = () => {
    contentForms[index] = { ...contentForms[index], options: [...options] };
    dispatch({ type: "CHANGE_CONTENTFORM", value: [...contentForms] });
  };

  const [checks, setChecks] = useState([]);

  const inputs = state.inputs;
  const resIndex = inputs.findIndex((el) => el.id === id);

  const handleChange = (e, idx) => {
    const arr = checks;
    !arr[idx] ? (arr[idx] = e.target.value) : (arr[idx] = null);
    setChecks(arr);

    if (resIndex === -1) {
      // id not found
      if (inputs.length === 0) {
        // because of array is empty
        dispatch({
          type: "CHANGE_INPUTS",
          value: [{ id, type: "checkbox", inputs: arr }],
        });
      } else {
        // array isnt empty but id doesnt exist
        dispatch({
          type: "CHANGE_INPUTS",
          value: [...inputs, { id, type: "checkbox", inputs: arr }],
        });
      }
    } else {
      // id found
      inputs[resIndex] = { ...inputs[resIndex], inputs: arr };
      dispatch({
        type: "CHANGE_INPUTS",
        value: [...inputs],
      });
    }
  };

  return (
    <div>
      {options.map((el, idx) => (
        <div key={idx} className="flex items-center space-x-3 relative group">
          <input
            onClick={(e) => handleChange(e, idx)}
            name="checkbox"
            value={el}
            type="checkbox"
            disabled={state.isEdit}
            className="h-5 w-5"
          />
          <input
            disabled={!state.isEdit}
            value={el ? el : ""}
            onChange={(e) => {
              options[idx] = e.target.value;
              saveData();
            }}
            placeholder={`opsi ${idx + 1}`}
            className={`${
              state.isDark
                ? "bg-gray-100 hover:border-gray-300 border-gray-100"
                : "bg-white hover:border-gray-300 border-white"
            } border-b focus:border-b-2 focus:border-purple-700 w-full py-2`}
          />
          {state.isEdit && options.length > 1 && (
            <div
              className="absolute right-0 flex justify-end items-center cursor-pointer opacity-0 group-hover:opacity-100 duration-300"
              onClick={() => {
                options.splice(idx, 1);
                saveData();
              }}
            >
              <img
                src={plusIcon}
                alt="delete"
                className="h-5 w-5 transform rotate-45"
              />
            </div>
          )}
        </div>
      ))}
      {state.isEdit && (
        <div className="flex items-center space-x-3">
          <input type="checkbox" disabled className="h-5 w-5" />
          <button
            type="button"
            onClick={() => {
              options.push("");
              saveData();
            }}
            className={`${
              state.isDark
                ? "bg-gray-100 hover:border-gray-300 border-gray-100"
                : "bg-white hover:border-gray-300 border-white"
            } border-b focus:border-b-2 focus:border-purple-700 py-2 text-gray-400`}
          >
            Add option
          </button>
        </div>
      )}
    </div>
  );
};
